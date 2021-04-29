# API GW Deployment Custom Resource
## Description
Custom resource for handling issue while creating multiple custom domain at the same time getting
an 'Error occurred during operation ‘Too Many Requests (Service: ApiGateway, Status Code: 429, Request ID: 69bac4f4-f174-49d1-b02e-97ebe6ea8b3d, Extended Request ID: null)’.'.
This custom resource will try to create the custom domain at least 6 times in a 15 minutes lapsus (programatically retries). If fails, the lambda will be called at least 2 more times (lambda retry config). If still fails, a deadeletter lambda will collect the information and will mark the custom resource as failed.

## Architecture
Custom Resource consist of a Lambda created with a SAM template.   

## How to deploy
Generate the package and then deploy with the SAM template. Run this command lines:
```
1) npm test
2) npm install
3) sam package --s3-bucket vcis-lambda-github-source-infra --output-template-file /tmp/output-sam.yaml -t sam.yaml
4) sam deploy --template-file /tmp/output-sam.yaml --guided
```

## How to use
Place this resource on your Service SAM template:
```yaml
ApiGatewayCustomDomain:
    DependsOn:
      - Stage
    Type: 'Custom::ApiGatewayCustomDomain'
    Version: '1.0'
    Properties:
      ServiceToken:
        Fn::ImportValue: !Sub "${ApiGatewayCustomDomainStackName}-ApiGatewayCustomDomainCreatorFunctionArn" #the stack were the backed lambda for this custom resource has been deployed
      DomainName: !Ref DomainName # the domain name you wanna create
      CertificateArn: !Ref ACMCertificateArn #Your domain ACM cert
      EndpointConfiguration:
        Types:
          - EDGE #you could also set REGIONAL type

```

If you are using ApiGatewayV2, use this on your Service SAM template:
```yaml
ApiGatewayCustomDomain:
    DependsOn:
      - Stage
    Type: 'Custom::ApiGatewayCustomDomain'
    Version: '2.0'
    Properties:
      ServiceToken:
        Fn::ImportValue: !Sub "${ApiGatewayCustomDomainStackName}-ApiGatewayCustomDomainCreatorFunctionArn"
      Version: '2.0'
      DomainName: !Ref DomainName # the domain name you wanna create
      DomainNameConfigurations:
        - EndpointType: REGIONAL #for V2, only REGIONAL is valid
          CertificateArn: !Ref ACMCertificateArn #Your domain ACM cert

```

