const Constants = require('./constants');
const deepIterator = require('deep-iterator').default;
const Repository = require('migration-automation-shared').Repository;

module.exports = {
  // Update libs to support SSM.
  updatedPackageJson: async (input) => {
    const packageFile = await Repository.getFile(input.functionRepositoryName,
        input.baseBranch, 'package.json');
    packageFile.dependencies['@monsantoit/finance-config-loader'] = '2.0.0';
    return JSON.stringify(packageFile, null, 2);
  },

  // Update config file resources with the new account number and prefix.
  updateConfigFile: async (input) => {
    let path = 'config/config.json';
    let configFile = await Repository.getFile(input.functionRepositoryName,
        input.baseBranch, path);
    if (!configFile) {
      path = 'config/env-config.json';
      configFile = await Repository.getFile(input.functionRepositoryName,
          input.baseBranch, path);
    }

    const it = deepIterator(configFile, {onlyLeaves: true});
    for (const {parent, value, key} of it) {
      if (value.toString().startsWith(Constants.SQS_NON_PROD_PREFIX_ORIGINAL)) {
        parent[key] = value.replace(Constants.SQS_NON_PROD_PREFIX_ORIGINAL,
            Constants.SQS_NON_PROD_PREFIX_NEW);
      }
      if (value.toString().startsWith(Constants.SQS_PROD_PREFIX_ORIGINAL)) {
        parent[key] = value.replace(Constants.SQS_PROD_PREFIX_ORIGINAL,
            Constants.SQS_PROD_PREFIX_NEW);
      }
      if (value.toString().startsWith(Constants.SNS_NON_PROD_PREFIX_ORIGINAL)) {
        parent[key] = value.replace(Constants.SNS_NON_PROD_PREFIX_ORIGINAL,
            Constants.SNS_NON_PROD_PREFIX_NEW);
      }
      if (value.toString().startsWith(Constants.SNS_PROD_PREFIX_ORIGINAL)) {
        parent[key] = value.replace(Constants.SNS_PROD_PREFIX_ORIGINAL,
            Constants.SNS_PROD_PREFIX_NEW);
      }
    }

    return {
      path: path,
      content: JSON.stringify(configFile, null, 2),
    };
  },
};
