const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports.sam = (newFunctionBaseName, input, functionConfig, queues, topics) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'sam_template.yaml')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        DEFAULT_FUNCTION_NAME: newFunctionBaseName,
        DEFAULT_TIMEOUT: functionConfig.timeout,
        DEFAULT_MEMORY_SIZE: functionConfig.memorySize,
        RESERVED_CONCURRENT_EXECUTIONS: functionConfig.reservedConcurrentExecutions,
        HANDLER: functionConfig.handler,
        LOG_GROUP_NAME: input.newLogGroupName,
        HAS_LOG_GROUP: input.newLogGroupName != null,
        API_GW_METHODS: functionConfig.apiGwMethods,
        HAS_API_GW_INTEGRATION: functionConfig.apiGwMethods.length > 0,
        HAS_VPC: functionConfig.hasVpc,
        HAS_QUEUES: queues && queues.length > 0,
        QUEUES: queues,
        HAS_TOPICS: topics && topics.length > 0,
        TOPICS: topics,
      });

  return contents;
};

module.exports.buildSpec = (newFunctionBaseName) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'buildspec_template.yaml')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        FUNCTION_NAME: newFunctionBaseName,
      });

  return contents;
};

module.exports.cdParams = (newFunctionBaseName, env, account, functionTags) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'cd-param_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        FUNCTION_NAME: newFunctionBaseName,
        ENV: env,
        ACCOUNT: account,
        TAGS: functionTags,
      });

  return contents;
};

module.exports.samConfig = (newFunctionBaseName, newRestApiName, hasVpc, env, account,
    functionTags) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'sam-config_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        API_GW_NAME: newRestApiName,
        HAS_VPC: hasVpc,
        FUNCTION_NAME: newFunctionBaseName,
        ENV: env,
        ACCOUNT: account,
        TAGS: functionTags,
      });

  return contents;
};

module.exports.snsTopics = (
    previousResources, previuousOutputs, sharedTopics) => {
  const source = fs.readFileSync(
      path.resolve(__dirname, 'sns/sns-topics_template.yaml')).toString();
  const template = Handlebars.compile(source);
  const contents = template(
      {
        PREVIOUS_RESOURCES: previousResources,
        PREVIOUS_OUTPUTS: previuousOutputs,
        SHARED_TOPICS: sharedTopics,
      });
  console.log(contents);
  return contents;
};

module.exports.snsTopicsCdParams = (env, account) => {
  const source = fs.readFileSync(
      path.resolve(__dirname, 'sns/sns-topics_cd-param_template.json')).
      toString();
  const template = compileSource(source);

  const contents = template(
      {
        ENV: env,
        ACCOUNT: account,
      });

  return contents;
};

module.exports.snsTopicsConfig = (env) => {
  const source = fs.readFileSync(
      path.resolve(__dirname, 'sns/sns-topics_config_template.json')).
      toString();
  const template = compileSource(source);

  const contents = template(
      {
        ENV: env,
      });

  return contents;
};

const compileSource = (source) => Handlebars.compile(source, {
  noEscape: true,
});
