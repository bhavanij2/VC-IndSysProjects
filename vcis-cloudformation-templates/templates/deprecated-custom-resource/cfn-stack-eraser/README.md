# Cfn Stack Eraser Custom Resource
## Description
Custom resource for handling deleting of child/nested stacks.
Custom Resource info: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html

## Architecture
Custom Resource consist of a Lambda created with a SAM template.   

## How to deploy
Generate the package and then deploy with the SAM template. Run this command lines:
```
1) npm test
2) npm install
3) aws cloudformation package --template sam.yaml --s3-bucket vcis-lambda-github-source-infra --output-template /tmp/output-sam.yaml
4) aws cloudformation deploy --template-file /tmp/output-sam.yaml --stack-name vcis-cfn-stack-eraser-custom-resource --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```

## How to use
Place this resource on your AWS Pipeline template:
```yaml

... 
Parameters:

  CfnStackEraserStackName:
    Type: String
    Description: 'Cfn stack eraser custom resource stack'
    Default: 'vcis-cfn-stack-eraser-custom-resource'

...

Resources:
  CfnWorkloadStackEraser:
    Type: 'Custom::CfnStackEraser'
    Version: '1.0'
    Properties:
      ServiceToken:
        Fn::ImportValue: !Sub "${CfnStackEraserStackName}-CfnStackEraserFunctionArn"
      #Name of the stack you wanna delete. In this example we get the name  is begin genarated doing !Sub '${WorkloadName}-${Env}'
      StackName: !Sub '${WorkloadName}-${Env}'
      RoleArn:
        Fn::ImportValue: !Sub "${CfnStackEraserStackName}-CfnStackEraserExecutionRoleArn"
```

