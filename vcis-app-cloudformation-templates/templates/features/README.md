# Features template

- These templates are used to deploy infrastructure templates for the resources that are used in services, like SQSs and SNSs in lambda functions
- The resources are grouped by features
- Each feature has its own folder
- Under feature's folder there should be a file named _resources.yaml_ and a folder named _config_ with the setup for each environment
- The template _resources.yaml_ will define all the resources that each service of a given feature uses (SQSs, SNSs and its policies, mappings..)
- Each resource ARN should be exported as an output, so that the SAM templates will be able to import and use them  
- Since that templates will be under CICD, we should have 3 config files:
    - **cd-param-{env}.json:** for the configuration of the pipeline
    - **vcis-app-{featureName}-feature-resources-{env}-update-config.json:** for the testing stage of the pipeline  
    - **vcis-app-{featureName}-feature-resources-{env}-config.json:** for the deploy stage of the pipeline
