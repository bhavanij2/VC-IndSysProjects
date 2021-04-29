const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports.yaml = (queues, topics) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'template.yaml')).
      toString();
  const template = compileSource(source);
  const contents = template(
      {
        HAS_QUEUES: queues && queues.length > 0,
        QUEUES: queues,
        HAS_TOPICS: topics && topics.length > 0,
        TOPICS: topics,
      });
  return contents;
};

module.exports.cdParams = (env, account, functionTags) => {
  const source = fs.readFileSync(
      path.resolve(__dirname, 'cd-param_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        ENV: env,
        ACCOUNT: account,
        TAGS: functionTags,
      });

  return contents;
};

module.exports.yamlConfig = (env, account, functionTags) => {
  const source = fs.readFileSync(
      path.resolve(__dirname, 'config_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        ENV: env,
        ACCOUNT: account,
        TAGS: functionTags,
      });

  return contents;
};

const compileSource = (source) => Handlebars.compile(source, {
  noEscape: true,
});
