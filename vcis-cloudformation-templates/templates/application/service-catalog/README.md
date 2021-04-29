# Service Catalog Foundations
## Description
This includes the products of service catalog to be created. 

Items included in order of dependency: 

- Service Catalog Product - UI CI-CD Pipeline
- Service Catalog Product - SAM CI-CD Pipeline
- Service Catalog Product - Application Infrastructure CI-CD Pipeline
- Service Catalog Portfolio
- Service Catalog Portfolio Constraints

## Pre requisites
This modules must be installed on the environment:
- Account Level Resources 
- Tagger
- Service catalog templates must be on s3 bucket: In Account level resources stack, should be an export value of s3 bucket: {account-level-resources}-ServiceCatalogProductsSourceBucket
Inside the bucket must be the templates that are defined inside the products yaml of this projects:
For Service Catalog Product - UI CI-CD Pipeline, this directories must be included: ui-ci-cd-pipeline/1.0.0/{filename}.yaml, ui-ci-cd-pipeline/1.0.1/{filename}.yaml, etc  
For Service Catalog Product - SAM CI-CD Pipeline, this directories must be included: sam-ci-cd-pipeline/1.0.0/{filename}.yaml, sam-ci-cd-pipeline/1.0.1/{filename}.yaml, etc
For Service Catalog Product - Application Infrastructure CI-CD Pipeline, this directories must be included: app-infra-ci-cd-pipeline/1.0.0/{filename}.yaml, app-infra-ci-cd-pipeline/1.0.1/{filename}.yaml, etc

Check the corresponding product yamls to verify the directories are the same.

## How to deploy
Deploy using AWS Cli on a terminal. Order is the same as description.
Run this command lines depending the env in which you want to deploy:

### Non Prod
```
1) cd {this path}
2) aws cloudformation create-stack --stack-name vcis-service-catalog-ui-ci-cd-pipeline-product-non-prod --template-body file://products/ui-ci-cd-pipeline/ui-ci-cd-pipeline-product.yaml --parameters file://products/ui-ci-cd-pipeline/config/non-prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
3) aws cloudformation create-stack --stack-name vcis-service-catalog-sam-ci-cd-pipeline-product-non-prod --template-body file://products/sam-ci-cd-pipeline/sam-ci-cd-pipeline-product.yaml --parameters file://products/sam-ci-cd-pipeline/config/non-prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
4) aws cloudformation create-stack --stack-name vcis-service-catalog-app-infra-ci-cd-pipeline-product-non-prod --template-body file://products/app-infra-ci-cd-pipeline/app-infra-ci-cd-pipeline-product.yaml --parameters file://products/app-infra-ci-cd-pipeline/config/non-prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
5) aws cloudformation create-stack --stack-name vcis-service-catalog-developer-products-portfolio-non-prod --template-body file://portfolio/developer-portfolio/developer-portfolio.yaml --parameters file://portfolio/developer-portfolio/config/non-prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
6) aws cloudformation create-stack --stack-name vcis-service-catalog-developer-products-portfolio-constraints-non-prod --template-body file://portfolio-product-template-constraints/developer-portfolio/developer-portfolio-constraints.yaml --parameters file://portfolio-product-template-constraints/developer-portfolio/config/non-prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
```
### Prod
```
1) cd {this path}
2) aws cloudformation create-stack --stack-name vcis-service-catalog-ui-ci-cd-pipeline-product-prod --template-body file://products/ui-ci-cd-pipeline/ui-ci-cd-pipeline-product.yaml --parameters file://products/ui-ci-cd-pipeline/config/prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
3) aws cloudformation create-stack --stack-name vcis-service-catalog-sam-ci-cd-pipeline-product-prod --template-body file://products/sam-ci-cd-pipeline/sam-ci-cd-pipeline-product.yaml --parameters file://products/sam-ci-cd-pipeline/config/prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
4) aws cloudformation create-stack --stack-name vcis-service-catalog-app-infra-ci-cd-pipeline-product-prod --template-body file://products/app-infra-ci-cd-pipeline/app-infra-ci-cd-pipeline-product.yaml --parameters file://products/app-infra-ci-cd-pipeline/config/prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
5) aws cloudformation create-stack --stack-name vcis-service-catalog-developer-products-portfolio-prod --template-body file://portfolio/developer-portfolio/developer-portfolio.yaml --parameters file://portfolio/developer-portfolio/config/prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
6) aws cloudformation create-stack --stack-name vcis-service-catalog-developer-products-portfolio-constraints-prod --template-body file://portfolio-product-template-constraints/developer-portfolio/developer-portfolio-constraints.yaml --parameters file://portfolio-product-template-constraints/developer-portfolio/config/prod/params.json --capabilities CAPABILITY_AUTO_EXPAND 
```

Once the stacks are created you can create a pipeline per template. 
