const Template = require('./template/template');
const Tags = require('migration-automation-shared').Tags;
const Function = require('./function');
const Constants = require('./constants');
const PullRequest = require('./pullRequest');
const ServiceConfig = require('./serviceConfig');
const Resources = require('./resources');

module.exports.migrate = async (input) => {
  const newFunctionBaseName = Function.generateNewFunctionBaseNameFromArn(
      input.originalFunctionArn);
  const functionConfig = await Function.config(input);
  const functionTags = Tags.generateResourceTags(input.tags);
  const sharedResources = Resources.sharedResources(input);

  const samFile = Template.sam(newFunctionBaseName, input, functionConfig, sharedResources);
  const buildSpecFile = Template.buildSpec(newFunctionBaseName);
  const packageJsonFile = await ServiceConfig.updatedPackageJson(input);
  const configFile = await ServiceConfig.updateConfigFile(input);

  const cdFiles = [];
  // CD files
  Constants.ENVIRONMENTS.forEach((env) => {
    cdFiles.push({
      env: env.env,
      cdContent: Template.cdParams(newFunctionBaseName, env.env, env.account, functionTags),
      samConfigContent: Template.samConfig(
          newFunctionBaseName,
          input.newRestApiName,
          functionConfig.hasVpc,
          env.env,
          env.account,
          functionTags,
          sharedResources),
    });
  });


  await PullRequest.create(input, samFile, buildSpecFile, packageJsonFile, configFile,
      cdFiles);
};

