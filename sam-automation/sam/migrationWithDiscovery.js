const Template = require('./template/template');
const Repository = require('migration-automation-shared').Repository;
const Tags = require('migration-automation-shared').Tags;
const Function = require('./function');
const Constants = require('./constants');
const EventSources = require('./eventSources');

module.exports.migrate = async (input) => {
  // Function name
  const newFunctionBaseName = Function.generateNewFunctionBaseNameFromArn(
      input.originalFunctionArn);

  // Function Config
  const functionConfig = await Function.config(input);

  // Function tags
  const functionTags = Tags.generateResourceTags(input.tags);

  // Automatic discovery: (SQS on SAM)

  // Queues
  const queues = await EventSources.findQueues(input);

  // Topics
  const foundTopics = await EventSources.findTopics(input);
  const oneToOneTopics = foundTopics.OneToOneTopics;
  const sharedTopics = foundTopics.SharedTopics;

  // Package Json
  const packageJsonContent = await updatePackageJsonLibs(input);

  const pullRequestInput = {
    repoName: input.functionRepositoryName,
    baseBranch: input.baseBranch,
    pullRequestDescription: 'Changes applied with automation tools, containing SAM template, buildspec file, CD params and configuration changes to support SSM.',
    filesToPush: await filesToPush(newFunctionBaseName, input, functionConfig,
        packageJsonContent, queues, oneToOneTopics, functionTags),
  };
  await Repository.createPullRequest(pullRequestInput);

  // Shared SNS Topics template
  const sharedTopicsTemplateFile = await Repository.getFile(
      Constants.APP_CLOUDFORMATION_TEMPLATES_REPO,
      input.baseBranch, 'templates/features/pod-common/sns/resources.yaml');

  let previousResources = '';
  let previousOutputs = '';

  if (sharedTopicsTemplateFile) {
    console.log('Shared topics :: template file');
    console.log(sharedTopicsTemplateFile);
    const resourcesIndex = sharedTopicsTemplateFile.indexOf('Resources:');
    const outputsIndex = sharedTopicsTemplateFile.indexOf('Outputs:');
    previousResources = sharedTopicsTemplateFile.substring(
        resourcesIndex + 10,
        outputsIndex - 1);
    previousOutputs = sharedTopicsTemplateFile.substring(outputsIndex + 9,
        sharedTopicsTemplateFile.length - 1);
    console.log('Shared topics');
    console.log(foundTopics);
  }

  if (sharedTopics && sharedTopics.size > 0) {
    const pullRequestToVcisAppInput = {
      repoName: Constants.APP_CLOUDFORMATION_TEMPLATES_REPO,
      baseBranch: input.baseBranch,
      pullRequestDescription: 'Changes applied with automation tools. Here SNS topics shared between POD features.',
      filesToPush: await filesToPushIntoVcisApp(input, previousResources,
          previousOutputs,
          sharedTopics),
    };

    console.log('Shared topics :: Pull request to vcis-app');
    try {
      await Repository.createPullRequest(pullRequestToVcisAppInput);
    } catch (e) {
      try {
        await Repository.deleteMigrationBranch(input.functionRepositoryName);
      } catch (e) {
        console.log('Error while Rollback', e);
      }
      throw e;
    }
  }
};

const filesToPush = async (
  newFunctionBaseName, input, functionConfig, packageJsonContent, queues,
  oneToOneTopics, functionTags) => {
  const files = [];

  // SAM template
  files.push({
    file: 'sam.yaml',
    message: 'SAM Template',
    content: Template.sam(newFunctionBaseName, input, functionConfig, queues,
        oneToOneTopics),
  });

  // Buildspec template
  files.push({
    file: 'buildspec.yaml',
    message: 'Buildspec',
    content: Template.buildSpec(newFunctionBaseName),
  });

  // Package.json
  files.push({
    file: 'package.json',
    message: 'Package lib update to support SSM',
    content: packageJsonContent,
  });

  // CD files
  Constants.ENVIRONMENTS.forEach((env) => {
    // const env = Constants.BRANCH_TO_ENV_MAPPING.get(input.baseBranch);
    // const account = Constants.ENV_TO_ACCOUNT_MAPPING.get(env);

    files.push({
      file: `config/cfn/${env.env}/cd-param-${env.env}.json`,
      message: `CD Params from ${env.env}`,
      content: Template.cdParams(newFunctionBaseName, env.env, env.account, functionTags),
    });

    files.push({
      file: `config/cfn/${env.env}/sam-config.json`,
      message: `SAM Config from ${env.env}`,
      content: Template.samConfig(
          newFunctionBaseName,
          input.newRestApiName,
          functionConfig.hasVpc,
          env.env,
          env.account,
          functionTags), // env.account
    });
  });

  return files;
};

const filesToPushIntoVcisApp = async (
  input, previousResources, previousOutputs, sharedTopics) => {
  const files = [];

  files.push({
    file: input.feature ? 'templates/features/' + input.feature + '/sns/resources.yaml' : 'templates/features/pod-common/sns/resources.yaml',
    message: input.feature ? `${input.feature} - SNS Topics Template` : 'POD Common SNS Topics Template',
    content: Template.snsTopics(previousResources, previousOutputs,
        sharedTopics),
  });

  // CD files
  const env = Constants.BRANCH_TO_ENV_MAPPING.get(input.baseBranch);
  const account = Constants.ENV_TO_ACCOUNT_MAPPING.get(env);

  files.push({
    file: input.feature ? `templates/features/${input.feature}/sns/config/${env}/cd-param-${env}.json` : `templates/features/pod-common/sns/config/${env}/cd-param-${env}.json`,
    message: input.feature ? `${input.feature} - SNS CD Params from ${env}` : `POD Common SNS CD Params from ${env}`,
    content: Template.snsTopicsCdParams(env, account),
  });

  files.push({
    file: input.feature ? `templates/features/${input.feature}/sns/config/${env}/vcis-app-pod-common-sns-${env}-config.json` : `templates/features/pod-common/sns/config/${env}/vcis-app-pod-common-sns-${env}-config.json`,
    message: input.feature ? `${input.feature} SNS Topics Config` : 'POD Common SNS Topics Config',
    content: Template.snsTopicsConfig(env),
  });

  files.push({
    file: input.feature ? `templates/features/${input.feature}/sns/config/${env}/vcis-app-pod-common-sns-${env}-update-config.json` : `templates/features/pod-common/sns/config/${env}/vcis-app-pod-common-sns-${env}-update-config.json`,
    message: input.feature ? `${input.feature} SNS Topics Update Config` : 'POD Common SNS Topics Update Config',
    content: Template.snsTopicsConfig(env),
  });

  return files;
};

// Update libs to support SSM.
const updatePackageJsonLibs = async (input) => {
  const packageFile = await Repository.getFile(input.functionRepositoryName,
      input.baseBranch, 'package.json');
  packageFile.dependencies['@monsantoit/finance-config-loader'] = '2.0.0';
  return JSON.stringify(packageFile, null, 2);
};


// Que haces automatico con los sns?
