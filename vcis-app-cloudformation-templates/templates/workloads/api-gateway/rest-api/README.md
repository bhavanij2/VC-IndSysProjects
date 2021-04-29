## Rest API Creation CloudFormation and CodePipeline

### Description
This directory contains CloudFormation files for Rest API creation.

- `/api-gateway-rest-api.yaml` This is the CloudFormation template for creating Rest API

### Test API (vcis-test-api) - Deploy to `poc`
- `config/vcis-test-api/poc/param.json` This is the parameter file for creating `vcis-test-api` using api-gateway-rest-api.yaml with aws cli(This should only be needed for testing)
- `config/vcis-test-api/poc/cd-param-poc.json` This is the parameter file for deploying templates/pipeline/infrastructure/infra-pipeline.yaml in poc.
- `config/vcis-test-api-poc-config.json` This is the parameter file for deploying via Codepipeline in the poc environment.
- `config/vcis-test-api-poc-update-config.json` This is the parameter file used for the temporary cloudformation stack when creating a change set for poc deployments.

### vcis-api-pod-credit-exemption-balance-extract - Deploy to `dev`
- `config/vcis-api-pod-credit-exemption-balance-extract/dev/param.json` This is the parameter file for creating `vcis-api-pod-credit-exemption-balance-extract` using api-gateway-rest-api.yaml with aws cli(This should only be needed for testing)
- `config/vcis-api-pod-credit-exemption-balance-extract/dev/cd-param-dev.json` This is the parameter file for deploying templates/pipeline/infrastructure/infra-pipeline.yaml in dev.
- `config/vcis-api-pod-credit-exemption-balance-extract/dev/vcis-api-pod-credit-exemption-balance-dev-config.json` This is the parameter file for deploying via Codepipeline in the dev environment.
- `config/vcis-api-pod-credit-exemption-balance-extract/dev/vcis-api-pod-credit-exemption-balance-dev-update-config.json` This is the parameter file used for the temporary cloudformation stack when creating a change set for dev deployments.

### How to use this
* Create a GHE integration for the repo/branch.
* Satisfy all parameter requirements in cd-param-np.json. Those SSM Parameters need to be populated before you deploy.
* Use the AWS CLI to deploy the pipeline. 
* Once the pipeline has been deployed and all dependencies for this stack are in place any changes pushed to the appropriate branch will be pushed to the environment.
