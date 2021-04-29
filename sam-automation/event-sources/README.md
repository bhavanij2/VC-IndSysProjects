# SAM AUTOMATION
## Description
Process to automate generation of YAML template on a given input of SNS & SQS event sources for POD Project. 
This will:
- Create *migration-automation* branch on the *vcis-app-cloudformation-templates* repo.
- Add YAML template with specificied resources, fetching the configuration from the old account.
- It also replace the old prefix (brazil-value-capture) by the new one (vcis-app)
- Add cd-params configuration per environment used for CD.
- Create Pull Request to a base branch with all files.
 
## Assumptions
- 

## How to use
Run the Function with this input list:
```json
[{
  "functionRepositoryName": "pod-credit-exemption-balance-api",
  "originalFunctionArn": "arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-credit-consumption-api",
  "baseBranch": "develop",
  "newLogGroupName": "LannisterGroup",
  "newRestApiName": "vcis-app-apigw-pod-credit-exemption-balance-extract",  
  "originalRestApiId": "gkg1ib9end",
  "originalRestApiStageName": "dev",
  "tags":{
    "teamName": "lannister",
    "featureName": "credit-exemption-balance",
    "applicationName": "Industry System",
    "moduleName": ""
  }
}]
```
Where:
 * *functionRepositoryName*: Repository name of the Function to be migrated. *Must be on POD-Inc organization*. 
 * *originalFunctionArn*: Arn of the Function to be migrated. 
 * *baseBranch*: Base Branch to make the pull request with migration files.
 * *newLogGroupName*: [OPTIONAL] Log group name on the Variable Export for the Function. *Specify only if Function is using Centralized Log Group*.
 * *newRestApiName* [OPTIONAL]: New Rest Api Name (without enviornment suffix) *Specify only if Function is triggered by API Gateway*.
 * *originalRestApiId*: [OPTIONAL] Rest Api Id of the Function to be migrated. *Specify only if Function is triggered by API Gateway*.
 * *originalRestApiStageName*: [OPTIONAL] Rest Api Stage name of the Function to be migrated. *Specify only if Function is triggered by API Gateway*.
 * *tags.teamName*: Team that owns the New Function,
 * *tags.featureName*: Feature name that is been supported by this New Function,
 * *tags.applicationName*: Application Name,
 * *tags.moduleName*: Module Name,
 
 ## Additional Notes
 - Function name will be the original Function name replacing prefix *brazil-value-capture* with *vcis-app*.
 - Information to build the templates is fetched from *original* resources. You can specify production resources and that configuration will be used accross all envs. With this tool it is not possible to have different templates per enviornment.
 - When running the Function with multiple items inside the list, transaction will only be available per item, not on the whole list. Output will specify which items failed.
