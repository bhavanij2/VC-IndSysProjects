# SAM AUTOMATION
## Description
Process to automate generation of files and CF templates of Lambda functions and API Gateway for POD Project. Check each project readme file for more details.

## Architecture
Two Lambda function created with a SAM template.   

## Requisites
- The project uses *install-local* library for code sharing and packaging. To install this please run this command: `npm install install-local -g`
- The project uses eslint library for code linting. To install this please run this command: `npm install eslint eslint-config-google -g` 
## How to deploy
Generate the package and then deploy with the SAM template. Run this command lines (for non-prod enviorment):
```
1) Go to root directory of the repository
3) npm install
2) npm test
4) aws cloudformation package --template /Users/lschw1/Dev/Projects/sam-automation/sam.yaml --s3-bucket vcis-lambda-github-source-infra --output-template /tmp/output-sam.yaml
5) aws cloudformation deploy --template-file /tmp/output-sam.yaml --stack-name vcis-non-prod-pod-migration-automation --capabilities CAPABILITY_IAM CAPABILITY_AUTO_EXPAND
```

## How to use
Check each project readme file.
