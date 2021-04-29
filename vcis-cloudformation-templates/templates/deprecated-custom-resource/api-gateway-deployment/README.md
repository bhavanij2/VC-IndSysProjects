# API GW Deployment Custom Resource
## Description
Custom resource for handling issue while updating stage to the last api gateway deployment.
More info of the issue: https://stackoverflow.com/questions/41423439/cloudformation-doesnt-deploy-to-api-gateway-stages-on-update
Custom Resource info: https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html
Node Js library use as helper for Custom Resource: https://www.npmjs.com/package/cfn-lambda 

## Architecture
Custom Resource consist of a Lambda created with a SAM template.   

## How to deploy
Generate the package and then deploy with the SAM template. Run this command lines:
```
1) npm test
2) npm install
3) aws cloudformation package --template /Users/lschw1/Dev/Projects/vcis-cloudformation-templates/templates/custom-resource/api-gateway-deployment/sam.yaml --s3-bucket vcis-lambda-github-source-infra --output-template /tmp/output-sam.yaml
4) aws cloudformation deploy --template-file /tmp/output-sam.yaml --stack-name vcis-non-prod-pod-api-gateway-update-stage --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```

## How to use
Place this resource on your Service SAM template:
```yaml
ApiGatewayUpdateStage:
      Type: 'Custom::ApiGatewayUpdateStage'
      Version: '1.0'
      Properties:
        ServiceToken:
          Fn::ImportValue: !Sub "${ApiGateWayDeploymentUpdateStackName}-ApiGatewayUpdateStageFunctionArn" #ApiGateWayDeploymentUpdateStackName is the name given to the stack of the Custom resource (vcis-non-prod-pod-api-gateway-update-stage)
        DeploymentId: !Ref ApiGatewayDeployment #AWS::ApiGateway::Deployment resource.
        RestApiId:
          Fn::ImportValue: !Sub "${ApiGwStackName}-ApiGatewayId" #ApiGwStackName name of the api gw stack which has export the api gw Id.
      DependsOn:
        - ApiGatewayDeployment

```

If you are using ApiGatewayV2, use this on your Service SAM template:
```yaml
ApiGatewayUpdateStage:
      Type: 'Custom::ApiGatewayUpdateStage'
      Version: '2.0'
      Properties:
        Version: '2.0'
        ServiceToken:
          Fn::ImportValue: !Sub "${ApiGateWayDeploymentUpdateStackName}-ApiGatewayUpdateStageFunctionArn" #ApiGateWayDeploymentUpdateStackName is the name given to the stack of the Custom resource (vcis-non-prod-pod-api-gateway-update-stage)
        DeploymentId: !Ref ApiGatewayDeployment #AWS::ApiGateway::Deployment resource.
        ApiId:
          Fn::ImportValue: !Sub "${ApiGwStackName}-ApiGatewayId" #ApiGwStackName name of the api gw stack which has export the api gw Id.
      DependsOn:
        - ApiGatewayDeployment

```

