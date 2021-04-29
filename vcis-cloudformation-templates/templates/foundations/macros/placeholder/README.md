# Placeholder Macro
## Description
Macro that will replace placeholders inside your template. 

## Architecture
Macro consists of a Lambda and a Macro created with a SAM template.   

## How to deploy
Generate the package and then deploy with the SAM template. Run this command lines:
```
1) cd {this path}
1) npm test
2) npm install
3) aws cloudformation package --template sam.yaml --s3-bucket vcis-lambda-github-source-infra --output-template /tmp/output-sam.yaml
4.np) aws cloudformation deploy --template-file /tmp/output-sam.yaml --stack-name vcis-non-prod-placeholder-macro --parameter-overrides Env=non-prod ProjectModuleTag=/vcis/non-prod/infra/tags/project-module-pod --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND 
4.prod) aws cloudformation deploy --template-file /tmp/output-sam.yaml --stack-name vcis-prod-placeholder-macro --parameter-overrides Env=prod ProjectModuleTag=/vcis/prod/infra/tags/project-module-pod --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```

## How to use

Placeholder supported: 
- $timestamp: Will be replace by the current timestamp during macro execution. i.e: 1600132349011

a. Place this macro into the transform on your Service SAM template:
```yaml
Transform: [VcisPlaceholderMacro]
```
b. Add the placeholder anywhere and multiple times inside the template: 
```yaml
  Deployment$timestamp:
    Type: AWS::ApiGateway::Deployment
    Properties:
      Description: API Deployment
      RestApiId: !Ref RestApi

  Stage:
    Type: AWS::ApiGateway::Stage
    DependsOn: Deployment$timestamp
    Properties:
      RestApiId: !Ref RestApi
      DeploymentId: !Ref Deployment$timestamp
      StageName: !Ref StageName
      Variables:
        environment: !FindInMap [EnvStageVarMapping, !Ref Env, EnvStageVar]
```
