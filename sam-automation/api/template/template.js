const Handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');

module.exports.cf = (apiGwResources) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'cf_template.yaml')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        API_GW_RESOURCES: apiGwResources,
      });

  return contents;
};

module.exports.cdParams = (input, env, apiTags) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'cd-param_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        API_NAME: input.newRestApiName,
        ENV: env,
        TAGS: apiTags,
      });

  return contents;
};

module.exports.cdConfig = (input, env, account, apiTags) => {
  const source = fs.readFileSync(path.resolve(__dirname, 'cd-config_template.json')).toString();
  const template = compileSource(source);

  const contents = template(
      {
        API_NAME: input.newRestApiName,
        API_DESCRIPTION: input.newRestApiDescription,
        ENV: env,
        ACCOUNT: account,
        TAGS: apiTags,
      });

  return contents;
};

const compileSource = (source) => Handlebars.compile(source, {
  noEscape: true,
});
