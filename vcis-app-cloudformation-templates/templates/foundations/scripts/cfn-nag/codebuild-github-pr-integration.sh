#!/bin/bash
set -e
ghe_organization='POD-Inc'
ghe_repository_name='vcis-cloudformation-templates'
github_api_v3_access_token=`aws ssm get-parameters --with-decryption --names "/vcis/non-prod/infra/github-access-token" --query 'Parameters[0].Value' | tr -d '"'`
ghe_api_v3_url="https://github.platforms.engineering/api/v3/repos/${ghe_organization}/${ghe_repository_name}/hooks?access_token="${github_api_v3_access_token}


if [[ -z $1  ]]; then
  printf "\033[1;31mStack name is required\033[0m\n" & \
  exit 1
else
    stack_name=$1
fi

echo "Creating stack..."
aws cloudformation create-stack --stack-name $1 --template-body file://templates/pipeline/cfn-nag-codebuild.yaml --capabilities CAPABILITY_IAM
aws cloudformation wait stack-create-complete --stack-name $1
stack_status=`aws cloudformation describe-stacks --stack-name=$1 --query 'Stacks[0].StackStatus' --output text`
if [[ stack_status == "ROLLBACK_COMPLETE" ]]; then
    printf "\033[1;31mError: stack for BuildProject could not been created\033[0m\n"
    echo "Deleting stack..."
    aws cloudformation delete-stack --stack-name $1
    exit 6
else
    echo "Cloudformation stack created OK."
fi
build_project_name=`aws cloudformation list-stack-resources --stack-name $1 --query "StackResourceSummaries[1].PhysicalResourceId" --output text`

echo "Creating webhook in codebuild..."
create_hook_output=`aws codebuild create-webhook \
--project-name ${build_project_name} \
--filter-groups '[[{"type":"EVENT","pattern":"PULL_REQUEST_CREATED, PULL_REQUEST_UPDATED, PULL_REQUEST_REOPENED"}]]'`

if [[ $? == "0" ]]; then
    payload_url=`echo ${create_hook_output} | jq -r .webhook.payloadUrl`
    secret=`echo ${create_hook_output} | jq -r .webhook.secret`

    ghe_api_v3_output=`curl -X POST ${ghe_api_v3_url} \
    -d '{"name":"web","active":true,"events":["push", "pull_request"], "config":{"url":"'${payload_url}'", "content_type":"json", "secret": "'${secret}'"}' \
    -H "Content-Type: application/json"`

    ghe_api_v3_result=`echo ${ghe_api_v3_output} | jq -r .message`

    if [[ "$ghe_api_v3_result" == *"Not Found"* ]]; then
       echo "Error associating codebuild webhook with GitHub API v3, rolling back CloudFormation stack"
       aws cloudformation delete-stack --stack-name $1
       aws cloudformation wait stack-delete-complete --stack-name $1
       exit 7
    fi
else
   echo "Error: Could not create the Webhook, rolling back CloudFormation stack"
   aws cloudformation delete-stack --stack-name $1
   aws cloudformation wait stack-delete-complete --stack-name $1
   exit 7
fi
