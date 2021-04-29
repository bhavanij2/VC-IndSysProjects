## ECR CloudFormation and CodePipeline

### Description
This directory contains CloudFormation files for ECR.

-`ecr-cloudformation.yaml` This is the CloudFormation template for ECR

-`config/poc/cd-param-poc.json` This is the parameter file for deploying templates/foundations/pipeline/cloudformation/pipeline.yaml in poc.
-`config/poc/vcis-ecr-poc-config.json` This is the parameter file for deploying via Codepipeline in the poc environment.
-`config/poc/vcis-ecr-poc-update-config.json` This is the parameter file used for the temporary cloudformation stack when creating a change set for poc deployments.

-`config/dev/cd-param-dev.json` This is the parameter file for deploying templates/foundations/pipeline/cloudformation/pipeline.yaml in dev.
-`config/dev/param.json` This is the parameter file for testing ecr-cloudformation.yaml.
-`config/dev/vcis-ecr-dev-config.json` This is the parameter file for deploying via Codepipeline in the dev environment.
-`config/dev/vcis-ecr-dev-update-config.json` This is the parameter file used for the temporary cloudformation stack when creating a change set for dev deployments.

### How to use this
* Satisfy all parameter requirements in cd-param-np.json. Those SSM Parameters need to be populated before you deploy.
* Use the AWS CLI to deploy the pipeline. 
* Once the pipeline has been deployed and all dependencies for this stack are in place any changes pushed to the environment will be pushed to the environment.
