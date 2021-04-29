# API AUTOMATION
## Description
Process to automate generation of CF template on a given API Gateway for POD Project. 
This will:
- Create *migration-automation* branch on the Function repository.
- Add CF template with specific API information.
- Add cd-params configuration per environment used for CD.
- Add cd-config file per environment used for CD.
- Create Pull Request to a base branch with all files.

## How to use
Run the Function with this input list:
```json
[{
  "newRestApiName": "vcis-app-apigw-pod-credit-exemption-balance-extract",
  "newRestApiDescription": "POD - Credit Exemption Balance and Extract API",
  "tags": {
    "teamName": "lannister",
    "featureName": "credit-exemption-balance",
    "applicationName": "Industry System",
    "moduleName": "",
  },
  "pathsToInclude": [
    "/credit-exemption/balance/b2b/balance/{documentType}/{documentNumber}",
    "/credit-exemption/balance/b2b/doc/swagger.json",
    "/credit-exemption/balance/b2b/extract/{documentType}/{documentNumber}/{technology}",
    "/credit-exemption/balance/b2b/extract/{documentType}/{documentNumber}/{technology}/{from}/{to}",
    "/credit-exemption/balance/b2b/history/{documentType}/{documentNumber}/{technology}",
    "/credit-exemption/balance/b2b/transactions/{transactionID}/detail",
    "/credit-exemption/balance/b2b/{version}/balance/{documentType}/{documentNumber}",
    "/credit-exemption/balance/b2b/{version}/doc/swagger.json",
    "/credit-exemption/balance/b2b/{version}/extract/{documentType}/{documentNumber}/{technology}",
    "/credit-exemption/balance/b2b/{version}/extract/{documentType}/{documentNumber}/{technology}/{from}/{to}",
    "/credit-exemption/balance/b2b/{version}/history/{documentType}/{documentNumber}/{technology}",
    "/credit-exemption/balance/b2b/{version}/transactions/{transactionId}/detail",
    "/credit-exemption/transfer/balance/{documentType}/{documentNumber}",
    "/brazil-value-capture-credit-exemption-balance-api"
  ],
  "originalRestApiId": "gkg1ib9end",
  "originalRestApiStageName": "dev",
  "baseBranch": "develop",
  "feature": "pod-credit-exemption"
}]
```
Where:
 * *newRestApiName*: New Rest Api Name (without enviornment suffix).
 * *newRestApiDescription*: New Rest Api Description.
 * *tags.teamName*: Team that owns the New Rest Api,
 * *tags.featureName*: Feature name that is been supported by this New Rest Api,
 * *tags.applicationName*: Application Name,
 * *tags.moduleName*: Module Name,
 * *pathsToInclude*: Paths to be migrated from original Api to the new one. Need to be on swagger format. 
 * *originalRestApiId*: Original Rest Api Id to migrate.
 * *originalRestApiStageName*: Original Rest Api Stage name to migrate.
 * *baseBranch*: Base Branch to make the pull request with migration files.
 * *feature*: The sub-directory under which all files will be generated in _vcis-app-cloudformation-templates_ repo
 
 ## Additional Notes
 - Only Path Resources and Mocks Integrations will be part of this template.
 - Information to build the templates is fetched from *original* resources. You can specify production resources and that configuration will be used accross all envs. With this tool it is not possible to have different templates per enviornment.
 - When running the Function with multiple items inside the list, transaction will only be available per item, not on the whole list. Output will specify which items failed.
