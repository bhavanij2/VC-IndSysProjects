const Template = require('./template/template');
const Repository = require('migration-automation-shared').Repository;
const Constants = require('./constants');
const EventSources = require('./eventSources');

module.exports.migrate = async (input) => {
  const queues = await EventSources.fetchQueuesConfiguration(input);
  const topics = await EventSources.fetchTopicsConfiguration(input);

  const pullRequestInput = {
    repoName: Constants.APP_CLOUDFORMATION_TEMPLATES_REPO,
    baseBranch: input.baseBranch,
    pullRequestDescription: 'Changes applied with automation tools, containing YAML template, CD params and configuration changes to support SSM.',
    filesToPush: await filesToPush(input, queues, topics),
  };

  await Repository.createPullRequest(pullRequestInput);
};

const filesToPush = async (input, queues, topics) => {
  const files = [];
// CD files
  const env = Constants.BRANCH_TO_ENV_MAPPING.get(input.baseBranch);
  const account = Constants.ENV_TO_ACCOUNT_MAPPING.get(env);

  // YAML Resources template
  files.push({
    file: input.feature ?
        `templates/features/${input.feature}/resources.yaml` :
        `templates/features/pod-common/resources.yaml`,
    message: input.feature ?
        `${input.feature} - Resources yaml file from ${env}` :
        `POD Common resources CD Params from ${env}`,
    content: Template.yaml(queues, topics),
  });

  // CD files
  Constants.ENVIRONMENTS.forEach((env) => {
    files.push({
      file: input.feature ?
          `templates/features/${input.feature}/config/${env}/cd-param-${env}.json` :
          `templates/features/pod-common/config/${env}/cd-param-${env}.json`,
      message: input.feature ?
          `${input.feature} - SNS CD Params from ${env}` :
          `POD Common SNS CD Params from ${env}`,
      content: Template.cdParams(env, account, input.tags),
    });

    files.push({
      file: input.feature ?
          `templates/features/${input.feature}/config/${env}/vcis-app-pod-common-sns-${env}-config.json` :
          `templates/features/pod-common/sns/config/${env}/vcis-app-pod-common-sns-${env}-config.json`,
      message: input.feature ?
          `${input.feature} SNS Topics Config` :
          'POD Common SNS Topics Config',
      content: Template.yamlConfig(env, account, input.tags),
    });

    files.push({
      file: input.feature ?
          `templates/features/${input.feature}/config/${env}/vcis-app-pod-common-sns-${env}-update-config.json` :
          `templates/features/pod-common/sns/config/${env}/vcis-app-pod-common-sns-${env}-update-config.json`,
      message: input.feature ?
          `${input.feature} SNS Topics Update Config` :
          'POD Common SNS Topics Update Config',
      content: Template.yamlConfig(env, account, input.tags),
    });
  });

  return files;
};

