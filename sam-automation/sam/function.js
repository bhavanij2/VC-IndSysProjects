const AWS = require('aws-sdk');
const Api = require('./api');
const Constants = require('./constants');
const Parameter = require('migration-automation-shared').Parameter;

module.exports = {
  config: async (input) => {
    const credentials = await Parameter.awsCredentials();

    const config = await functionConfig(input, credentials);

    const apiGwMethods = await Api.apiGwMethods(input, credentials);

    return {
      timeout: config.Configuration.Timeout,
      memorySize: config.Configuration.MemorySize,
      reservedConcurrentExecutions: reservedConcurrentExecutions(config),
      handler: config.Configuration.Handler,
      hasVpc: config.Configuration.VpcConfig != null,
      apiGwMethods: apiGwMethods,
    };
  },
  generateNewFunctionBaseNameFromArn: (originalFunctionArn) => {
    return functionNameFromArn(originalFunctionArn).replace(
        Constants.FUNCTION_ORIGINAL_PREFIX, Constants.FUNCTION_NEW_PREFIX);
  },
};

const reservedConcurrentExecutions = (config) => {
  if (config.Concurrency) {
    return config.Concurrency.ReservedConcurrentExecutions;
  }
  return null;
};

const functionConfig = async (input, credentials) => {
  const lambda = new AWS.Lambda(credentials);
  const param = {FunctionName: input.originalFunctionArn};
  return await lambda.getFunction(param).promise();
};

const functionNameFromArn = (arn) => {
  const arnSplitted = arn.split(':');
  return arnSplitted[arnSplitted.indexOf('function')+1];
};

