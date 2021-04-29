# pod-slack-alert-notifier

Function that sends AWS Alarms to Slack.

## Architecture
The stack consist on a Lambda being triggered by a SNS call. Lambda will post a message into a slack channel using a webhook. 

Note: the SNS topic ARN is exported as an output

## How create a new Stack?

1) Create an SSM parameter with the webhook url for your slack channel. Example of SSM parameter name: `/vcis/dev/app/ops/stark-slack-webhook`.

2) Create a configuration file standing the parameters for the SAM template. Save it in the pod-slack-alert-notifier project in the ./config/{env} folder. Example: 

    ```
    [
      {
        "ParameterKey": "Env",
        "ParameterValue": "it"
      },
      {
        "ParameterKey": "ProjectModuleTag",
        "ParameterValue": "/vcis/dev/infra/tags/project-module-value-capture-industry-system"
      },
      {
        "ParameterKey": "WebhookSSMParameterName",
        "ParameterValue": "/vcis/it/app/ops/stark-slack-webhook"
      }
    ]
    ```

3) Change the `CodeUri` of the saml.yaml pointing to the S3 zip artifact that contains the latest version of the pod-slack-alert-notifier lambda. 
- Example: 
```
...
LogProccesor:
    Type: AWS::Serverless::Function
    Properties:
      FunctionName:
        Fn::Sub: ${FunctionName}-${Env}
      Handler: lambda.handler
      Runtime: nodejs8.10
      CodeUri: s3://vcis-lambda-github-source-infra/slack-alert-notifier-lambda.zip
...
```
        
4) Launch the SAM template (`saml.yaml`) passing the file created in previous step as parameters, making sure of using the correct IAM role (standard-user-role, admin-role or developer-role):

 - Example:                
`aws cloudformation create-stack --stack-name vcis-it-app-ops-stark-slack-notifier --template-body file:///<<YOUR LOCAL PATH>>/saml.yaml --parameters file:///<<YOUR LOCAL PATH>>/saml-config.json --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND`

You can also specify Lambda resources.
