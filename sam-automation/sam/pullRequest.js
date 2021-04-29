const Repository = require('migration-automation-shared').Repository;

module.exports.create = async (input, samFile, buildSpecFile, packageJsonFile, configFile,
  cdFiles) => {
  const files = [];

  // SAM template
  files.push({
    file: 'sam.yaml',
    message: 'SAM Template',
    content: samFile,
  });

  // Buildspec template
  files.push({
    file: 'buildspec.yaml',
    message: 'Buildspec',
    content: buildSpecFile,
  });

  // Package.json
  files.push({
    file: 'package.json',
    message: 'Package lib update to support SSM',
    content: packageJsonFile,
  });

  // Config.json
  files.push({
    file: configFile.path,
    message: 'Config update with new account',
    content: configFile.content,
  });

  // CD files
  cdFiles.forEach((item) => {
    files.push({
      file: `config/cfn/${item.env}/cd-param-${item.env}.json`,
      message: `CD Params from ${item.env}`,
      content: item.cdContent,
    });

    files.push({
      file: `config/cfn/${item.env}/sam-config.json`,
      message: `SAM Config from ${item.env}`,
      content: item.samConfigContent,
    });
  });

  const pullRequestInput = {
    repoName: input.functionRepositoryName,
    baseBranch: input.baseBranch,
    pullRequestDescription: 'Changes applied with automation tools, containing SAM template, buildspec file, CD params and configuration changes to support SSM.',
    filesToPush: files,
  };

  await Repository.createPullRequest(pullRequestInput);
};
