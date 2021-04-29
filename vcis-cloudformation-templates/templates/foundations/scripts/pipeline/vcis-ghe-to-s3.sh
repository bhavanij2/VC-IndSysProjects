#!/bin/bash
#set -xe
#######################################################
# Check if we have aws, jq installed
#######################################################
command -v aws >/dev/null 2>&1
if [[ $? -eq 1 ]]; then
  echo "AWS CLI not installed!"
  echo "Please see the documentation for installation instructions:"
  echo "http://docs.aws.amazon.com/cli/latest/userguide/cli-install-macos.html"
  echo "http://docs.aws.amazon.com/cli/latest/userguide/awscli-install-linux.html"
  exit 1
fi

command -v jq >/dev/null 2>&1
if [[ $? -eq 1 ]]; then
  echo "JQ not installed!"
  echo "For macOS with brew installed, you can simply run `brew install jq`"
  echo "For other distributions, check the documentation:"
  echo "https://stedolan.github.io/jq/"
  exit 1
fi

if [[ $# -ge 1 ]]; then
    for ARGUMENT in "$@"
    do
        KEY=$(echo $ARGUMENT | cut -f1 -d=)
        VALUE=$(echo $ARGUMENT | cut -f2 -d=)

        case "$KEY" in
                ENV)                    ENV=${VALUE} ;;
                PROJECT)                PROJECT=${VALUE} ;;
                GHE_REPOSITORY_NAME)    GHE_REPOSITORY_NAME=${VALUE} ;;
                BRANCH_NAME)            BRANCH_NAME=${VALUE} ;;
                S3_SOURCE_STACK)        S3_SOURCE_STACK=${VALUE} ;;
                PROJECT_MODULE_SSM)     PROJECT_MODULE_SSM=${VALUE} ;;
                *)                      printf "\033[1;31m${KEY} is not a valid argument\033[0m\n"
                                        exit -1
                                        ;;
        esac
    done

    if [[ -z ${ENV} || (${ENV} != "dev" && ${ENV} != "it" && ${ENV} != "prod" && ${ENV} != "poc" && ${ENV} != "non-prod") ]]; then
      printf "\033[1;31mEnv is required as a parameter. Valid values are {'dev','it', 'prod', 'poc', 'non-prod'}\033[0m\n" & \
      exit 1
    else
        env=${ENV}
        if [[ env == 'prod' ]]; then
          account='prod'
        else
          account='non-prod'
        fi
    fi

    if [[ -z ${PROJECT} || (${PROJECT} != "vc" && ${PROJECT} != "pod") ]]; then
      printf "\033[1;31mPROJECT is required as a parameter. Valid values are {'pod','vc'}\033[0m\n" & \
      exit 2
    else
      if [[ ${PROJECT} == "pod" ]]; then
        ghe_organization="POD-Inc"
      fi
      if [[ ${PROJECT} == "vc" ]]; then
        ghe_organization="value-capture"
      fi
    fi

    if [[ -z ${GHE_REPOSITORY_NAME} ]]; then
      printf "\033[1;31mGHE_REPOSITORY_NAME is required as a parameter.\033[0m\n" & \
      exit 3
    else
      ghe_repository_name=${GHE_REPOSITORY_NAME}
    fi

    if [[ -z ${BRANCH_NAME} ]]; then
      printf "\033[1;31mBRANCH_NAME is required as a parameter.\033[0m\n" & \
      exit 4
    else
      ghe_ref="^refs/heads/"${BRANCH_NAME}"$"
    fi

    if [[ -n ${S3_SOURCE_STACK} ]]; then
      workload_account_level_input_params_stack_name=${S3_SOURCE_STACK}
    else
      printf "\033[1;31mFailed to set S3_SOURCE_STACK (WorkLoad account level input params stack name parameter).\033[0m\n" & \
      exit 5
    fi

    if [[ -n ${PROJECT_MODULE_SSM} ]]; then
      project_module_tag=${PROJECT_MODULE_SSM}
    else
      printf "\033[1;31mFailed to set PROJECT_MODULE_SSM (project module parameter).\033[0m\n" & \
      exit 6
    fi
fi

if [[ $# -eq 0 ]]; then

    printf "\033[0;33mWrite the Environment - Valid options are: dev, it, prod, poc or non-prod (enter for dev)?: \033[0m\n" & \
    echo -n ""
    read env

    if [[ -z ${env} ]]; then
        env='dev'
    fi

    if [[ (${env} != "dev" && ${env} != "it" && ${env} != "prod" && ${env} != "poc" && ${env} != "non-prod") ]]; then
      printf "\033[0;31mValid values are {'dev', 'it', 'prod', 'poc', 'non-prod'}\033[0m\n" & \
      exit 1
    else
        if [[ ${env} == 'prod' ]]; then
          account='prod'
          ghe_ref="^refs/heads/master$"
        else
          account='non-prod'
        fi

        if [[ ${env} == 'non-prod' ]]; then
          ghe_ref="^refs/heads/non-prod$"
        fi

        if [[ ${env} == 'dev' ]]; then
          ghe_ref="^refs/heads/develop$"
        fi

        if [[ ${env} == 'it' ]]; then
          ghe_ref="^refs/heads/test$"
        fi

        if [[ ${env} == 'poc' ]]; then
          ghe_ref="^refs/heads/poc$"
        fi
    fi

    printf "\033[0;33mWhat is the Project? Valid options are: pod, vc (enter for pod)?:\033[0m\n" & \
    echo -n ""
    read project

    if [[ -z ${project} ]]; then
        project="pod"
    fi

    if [[ -z ${project} || (${project} != "vc" && ${project} != "pod") ]]; then
      printf "\033[0;31mProject is required as a parameter. Valid values are {'pod','vc'}\033[0m\n" & \
      exit 2
    else
      if [[ ${project} == "pod" ]]; then
        ghe_organization="POD-Inc"
      fi
      if [[ ${project} == "vc" ]]; then
        ghe_organization="value-capture"
      fi
    fi

    printf "\033[0;33mWhat is the GHE Repository Name?:\033[0m\n" & \
    echo -n ""
    read ghe_repository_name

    if [[ -z ${ghe_repository_name} ]]; then
      printf "\033[0;31mGHE Repository Name is required as a parameter.\033[0m\n" & \
      exit 3
    fi

    printf "\033[0;33mBranch name - Only if you need to integrate with an specific one (enter to infer it from the Environment):\033[0m\n" & \
    echo -n ""
    read branch

    if [[ -n ${branch} ]]; then
        ghe_ref="^refs/heads/"${branch}"$"
    fi

    printf "\033[0;33mWhich is the CFN stack name where S3 bucket should be gotten from? (enter for vcis-non-prod-workloads-account-input-params):\033[0m\n" & \
    echo -n ""
    read workload_account_level_input_params_stack_name

    if [[ -z ${workload_account_level_input_params_stack_name} ]]; then
      workload_account_level_input_params_stack_name="vcis-non-prod-workloads-account-input-params"
    fi

    printf "\033[0;33mWhat is the Project Module Tag SSM Parameter name? (enter for /vcis/${env}/infra/tags/project-module-pod): \033[0m\n" & \
    echo -n ""
    read project_module_tag

    if [[ -z ${project_module_tag} ]]; then
      project_module_tag="/vcis/${env}/infra/tags/project-module-pod"
    fi
fi


FILE="codebuild-ghe-to-s3.yaml"
if [ -f "$FILE" ]; then
    local_template="codebuild-ghe-to-s3.yaml"
else
    printf "\033[0;31mUnable to locate Codebuild file.\033[0m\n" & \
    exit 1
fi

printf "\033[1;92m**** STEP 1: SET UP CODEBUILD PROJECT ****\033[0m\n"

github_api_v3_access_token=`aws ssm get-parameters --with-decryption --names "/vcis/${account}/infra/github-access-token" --query 'Parameters[0].Value' | tr -d '"'`

if [[ ${github_api_v3_access_token} == "null" ]]; then
  printf "\033[0;31mError: couldn't get GHE access token.\033[0m\n" & \
  exit 30
fi

ghe_repo_url="https://github.platforms.engineering/"${ghe_organization}"/"${ghe_repository_name}

stack_name="vcis-ghe-to-s3-"${ghe_repository_name}"-"${env}

build_output_path=''
build_output_name=${ghe_repository_name}

stack_status=`(aws cloudformation describe-stacks --stack-name=${stack_name} --query 'Stacks[0].StackStatus' --output text) 2> /dev/null`

if [[ ${stack_status} == "UPDATE_ROLLBACK_COMPLETE" ]]; then
    printf "\033[0;31mError: Stack ${stack_name} for BuildProject already exists but is in a failure state (UPDATE_ROLLBACK_COMPLETE) \033[0m\n"
    exit 10
fi

if [[ ${stack_status} == "CREATE_COMPLETE" ]] || [[ ${stack_status} == "UPDATE_COMPLETE" ]]; then
    printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Stack already exist, updating it..\033[0m\n"
    creating_webhook_for_first_time=0
    cfn_operation="update-stack"
    wait_operation="stack-update-complete"
else
    printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Creating stack for CodeBuild project..\033[0m\n"
    creating_webhook_for_first_time=1
    cfn_operation="create-stack"
    wait_operation="stack-create-complete"
fi

aws cloudformation ${cfn_operation} \
    --stack-name ${stack_name} \
    --template-body file://${local_template} \
    --capabilities CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND \
    --parameters \
    ParameterKey=Env,ParameterValue=${env} \
    ParameterKey=GHERepoURL,ParameterValue=${ghe_repo_url} \
    ParameterKey=WorkLoadAccountLevelInputParamsStackName,ParameterValue=${workload_account_level_input_params_stack_name} \
    ParameterKey=BuildOutputPath,ParameterValue=${build_output_path} \
    ParameterKey=BuildOutputName,ParameterValue=${build_output_name} \
    ParameterKey=ProjectModuleTag,ParameterValue=${project_module_tag} > /dev/null

printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Stack name: ${stack_name}\033[0m\n"
printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Waiting for stack status..\033[0m\n"
aws cloudformation wait ${wait_operation} --stack-name ${stack_name}
stack_status=`(aws cloudformation describe-stacks --stack-name=${stack_name} --query 'Stacks[0].StackStatus' --output text) 2> /dev/null`

if [[ stack_status == "ROLLBACK_COMPLETE" ]]; then
    printf "\033[0;31mError: stack for BuildProject could not been created\033[0m\n"
    exit 6
else
    printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: CodeBuild project OK\033[0m\n"
fi

build_project_name=`aws cloudformation list-stack-resources --stack-name ${stack_name} --query "StackResourceSummaries[1].PhysicalResourceId" --output text`
pattern=`aws codebuild batch-get-projects --names ${build_project_name} --query "projects[0].webhook.filterGroups[0][1].pattern" --output text`

if [[ creating_webhook_for_first_time  == 1 ]] || [[ ${pattern} != ${ghe_ref} ]]; then
    if [[ ${pattern} != ${ghe_ref} ]]; then
        aws codebuild delete-webhook --project-name ${build_project_name} > /dev/null
    fi

    printf "\033[1;92m**** STEP 2: CONFIGURE WEBHOOK IN CODEBUILD ****\033[0m\n"

    create_hook_output=`aws codebuild create-webhook \
    --project-name ${build_project_name} \
    --filter-groups '[[{"type":"EVENT","pattern":"PUSH"},{"type":"HEAD_REF","pattern":"'${ghe_ref}'"}]]'`

    if [[ $? == "0" ]]; then
        printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Webhook has been set in CodeBuild project.\033[0m\n"
        printf "\033[1;92m**** STEP 3: CONFIGURE WEBHOOK IN GHE ****\033[0m\n"
        payload_url=`echo ${create_hook_output} | jq -r .webhook.payloadUrl`
        secret=`echo ${create_hook_output} | jq -r .webhook.secret`
        ghe_api_v3_url="https://github.platforms.engineering/api/v3/repos/${ghe_organization}/${ghe_repository_name}/hooks?access_token="${github_api_v3_access_token}

        ghe_api_v3_output=`curl --silent -X POST ${ghe_api_v3_url} \
        -d '{"name":"web","active":true,"events":["push", "pull_request"], "config":{"url":"'${payload_url}'", "content_type":"json", "secret": "'${secret}'"}' \
        -H "Content-Type: application/json"`

        ghe_api_v3_result=`echo ${ghe_api_v3_output} | jq -r .message`

        if [[ "$ghe_api_v3_result" == *"Not Found"* ]]; then
           echo "Error associating webhook with GitHub API v3, rolling back CloudFormation stack"
           aws cloudformation delete-stack --stack-name ${stack_name}
           aws cloudformation wait stack-delete-complete --stack-name ${stack_name}
           printf "\033[1;31m\t`date '+%Y-%m-%d %H:%M:%S'`: Process finished unsuccessfully\033[0m\n"
           exit 7
        fi
    else
       echo "Error: Could not create the Webhook, rolling back CloudFormation stack"
       aws cloudformation delete-stack --stack-name ${stack_name}
       aws cloudformation wait stack-delete-complete --stack-name ${stack_name}
       printf "\033[1;31m\t`date '+%Y-%m-%d %H:%M:%S'`: Process finished unsuccessfully\033[0m\n"
       exit 7
    fi
    printf "\033[0;36m\t`date '+%Y-%m-%d %H:%M:%S'`: Webhook configured successfully.\033[0m\n"
    printf "\033[1;92mP R O C E S S   F I N I S H E D   S U C C E S S F U L L Y\033[0m\n"
else
    printf "\033[1;92mP R O C E S S   F I N I S H E D   S U C C E S S F U L L Y\033[0m\n"
fi
