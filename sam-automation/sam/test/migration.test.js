const Function = require('../function');
const Repository = require('migration-automation-shared').Repository;
const Tags = require('migration-automation-shared').Tags;
const Migration = require('../migration');
const fs = require('fs');
const path = require('path');

jest.mock('migration-automation-shared');
jest.mock('../function');

const input =
  {
    functionRepositoryName: 'pod-credit-exemption-balance-api',
    originalFunctionArn: 'arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-credit-exemption-balance-api',
    newLogGroupName: 'LannisterGroup',
    newRestApiName: 'vcis-app-apigw-pod-credit-exemption-balance-extract',
    originalRestApiId: 'gkg1ib9end',
    originalRestApiStageName: 'dev',
    baseBranch: 'develop',
    tags: {
      teamName: 'lannister',
      featureName: 'credit-exemption-balance',
      applicationName: 'Industry System',
      moduleName: 'IS',
    },
    consumerSQS: {stack: 'SharedResources1StackName', name: 'MyQueueConsumerArn', batchSize: 1},
    consumerSNS: {stack: 'SharedResources1StackName', name: 'MySNSConsumerArn', batchSize: 10},
    producerSQS: [{stack: 'SharedResources1StackName', name: 'MyQueueProducerArn'}],
    producerSNS: [{stack: 'SharedResources2StackName', name: 'MySNSProducerArn'}],
  };

beforeEach(() => {
  jest.resetModules(); // Clear cache
});


test('migrate should push sam template with vpc, ', async () =>{
  Function.config = jest.fn().mockResolvedValue({
    timeout: 60,
    memorySize: 128,
    handler: 'lambda.handler',
    hasVpc: true,
    apiGwMethods: [{
      resourceName: 'Creditexemptionbalanceb2bbalancedocumentTypedocumentNumberGetMethod',
      method: 'GET',
      hasAuth: false,
      parentKey: 'Creditexemptionbalanceb2bbalancedocumentTypedocumentNumberPath',
    },
    {
      resourceName: 'Creditexemptionbalanceb2bdocswaggerjsonGetMethod',
      method: 'GET',
      hasAuth: false,
      parentKey: 'Creditexemptionbalanceb2bdocswaggerjsonPath',
    }],
  });

  Function.generateNewFunctionBaseNameFromArn = jest.fn().mockReturnValue('vcis-app-credit-exemption-balance-api');
  Tags.generateResourceTags = jest.fn().mockReturnValue('Key=mon:feature,Value=credit-exemption-balance,Key=mon:team,Value=lannister,Key=mon:application,Value=Industry System,Key=mon:module,Value=IS');

  const configFile = require('./input/config.json');
  Repository.getFile = jest.fn()
      .mockResolvedValueOnce({dependencies: {}})
      .mockResolvedValueOnce(configFile);
  Repository.createPullRequest = jest.fn().mockResolvedValue(null);

  await Migration.migrate(input);


  const sam = fs.readFileSync(path.resolve(__dirname, 'output/sam.yaml')).toString();
  const buildspec = fs.readFileSync(path.resolve(__dirname, 'output/buildspec.yaml')).toString();
  const cdParamDev = fs.readFileSync(path.resolve(__dirname, 'output/cfn/dev/cd-param-dev.json')).toString();
  const samConfigDev = fs.readFileSync(path.resolve(__dirname, 'output/cfn/dev/sam-config.json')).toString();
  const cdParamIt = fs.readFileSync(path.resolve(__dirname, 'output/cfn/it/cd-param-it.json')).toString();
  const samConfigIt = fs.readFileSync(path.resolve(__dirname, 'output/cfn/it/sam-config.json')).toString();
  const cdParamPoc = fs.readFileSync(path.resolve(__dirname, 'output/cfn/poc/cd-param-poc.json')).toString();
  const samConfigPoc = fs.readFileSync(path.resolve(__dirname, 'output/cfn/poc/sam-config.json')).toString();
  const cdParamProd = fs.readFileSync(path.resolve(__dirname, 'output/cfn/prod/cd-param-prod.json')).toString();
  const samConfigProd = fs.readFileSync(path.resolve(__dirname, 'output/cfn/prod/sam-config.json')).toString();
  const configFileOutput = require('./output/config.json');
  const packageJson = {
    dependencies: {
      '@monsantoit/finance-config-loader': '2.0.0',
    },
  };

  const expected = {
    baseBranch: 'develop',
    pullRequestDescription: 'Changes applied with automation tools, containing SAM template, buildspec file, CD params and configuration changes to support SSM.',
    repoName: 'pod-credit-exemption-balance-api',
    filesToPush: [
      {
        file: 'sam.yaml',
        message: 'SAM Template',
        content: sam,
      },
      {
        file: 'buildspec.yaml',
        message: 'Buildspec',
        content: buildspec,
      },
      {
        file: 'package.json',
        message: 'Package lib update to support SSM',
        content: JSON.stringify(packageJson, null, 2),
      },
      {
        file: 'config/config.json',
        message: 'Config update with new account',
        content: JSON.stringify(configFileOutput, null, 2),
      },
      {
        file: 'config/cfn/poc/cd-param-poc.json',
        message: 'CD Params from poc',
        content: cdParamPoc,
      },
      {
        file: 'config/cfn/poc/sam-config.json',
        message: 'SAM Config from poc',
        content: samConfigPoc,
      },
      {
        file: 'config/cfn/dev/cd-param-dev.json',
        message: 'CD Params from dev',
        content: cdParamDev,
      },
      {
        file: 'config/cfn/dev/sam-config.json',
        message: 'SAM Config from dev',
        content: samConfigDev,
      },
      {
        file: 'config/cfn/it/cd-param-it.json',
        message: 'CD Params from it',
        content: cdParamIt,
      },
      {
        file: 'config/cfn/it/sam-config.json',
        message: 'SAM Config from it',
        content: samConfigIt,
      },
      {
        file: 'config/cfn/prod/cd-param-prod.json',
        message: 'CD Params from prod',
        content: cdParamProd,
      },
      {
        file: 'config/cfn/prod/sam-config.json',
        message: 'SAM Config from prod',
        content: samConfigProd,
      },
    ],
  };

  expect(Repository.createPullRequest).toHaveBeenCalledWith(expected);
});
