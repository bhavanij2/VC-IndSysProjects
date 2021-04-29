const Template = require('./template/template');
const Repository = require('migration-automation-shared').Repository;
const Tags = require('migration-automation-shared').Tags;
const Api = require('./api');
const Constants = require('./constants');

module.exports.migrate = async (input) => {
  if (!input.feature) {
    throw new Error('feature is required');
  }

  const apiGwResources = await Api.apiGwResources(input);

  const pullRequestInput = {
    repoName: Constants.APP_CLOUDFORMATION_TEMPLATES_REPO,
    baseBranch: input.baseBranch,
    pullRequestDescription: 'Changes applied with automation tools, containing Cloudformation template and CD params.',
    filesToPush: filesToPush(input, apiGwResources, input.feature),
  };

  await Repository.createPullRequest(pullRequestInput);
};


const filesToPush = (input, apiGwResources, feature) => {
  const files = [];

  const apiTags = Tags.generateResourceTags(input);

  // Cf template
  files.push({
    file: `templates/features/${feature}/api-gateway/rest-api/${input.newRestApiName}/api-gateway-rest-api.yaml`,
    message: 'Cf Template',
    content: Template.cf(apiGwResources),
  });

  // CD files
  Constants.ENVIRONMENTS.forEach((env) => {
    files.push({
      file: `templates/features/${feature}/api-gateway/rest-api/${input.newRestApiName}/config/cfn/${env.env}/cd-param-${env.env}.json`,
      message: `CD Params from ${env.env}`,
      content: Template.cdParams(input, env.env, apiTags),
    });

    files.push({
      file: `templates/features/${feature}/api-gateway/rest-api/${input.newRestApiName}/config/cfn/${env.env}/${input.newRestApiName}-${env.env}-config.json`,
      message: `CD Config from ${env.env}`,
      content: Template.cdConfig(input, env.env, env.account, apiTags),
    });

    files.push({
      file: `templates/features/${feature}/api-gateway/rest-api/${input.newRestApiName}/config/cfn/${env.env}/${input.newRestApiName}-${env.env}-update-config.json`,
      message: `CD Config Update from ${env.env}`,
      content: Template.cdConfig(input, env.env, env.account, apiTags),
    });
  });

  return files;
};
