const GitHub = require('github-api');
const Parameter = require('./parameter');

const Constants = Object.freeze({
  MIGRATION_BRANCH: 'automation-migration',
  GITHUB_ORG: 'POD-Inc',
  GITHUB_URL: 'https://github.platforms.engineering/api/v3',
  COMMIT_MSG_PREFIX: 'VCT-1000 - Migration Automation',
});

module.exports.getFile = async (repoName, baseBranch, file) => {
  const token = await Parameter.githubToken();

  const gh = new GitHub({token: token}, Constants.GITHUB_URL);

  const repo = gh.getRepo(Constants.GITHUB_ORG, repoName);

  const content = await repo.getContents(baseBranch, file, true);

  return content.data;
};

module.exports.createPullRequest = async (
  {
    repoName,
    baseBranch,
    pullRequestDescription,
    filesToPush,
  },
) => {
  const token = await Parameter.githubToken();

  const gh = new GitHub({token: token}, Constants.GITHUB_URL);

  const repo = gh.getRepo(Constants.GITHUB_ORG, repoName);
  await repo.fork();

  await repo.createBranch(baseBranch, Constants.MIGRATION_BRANCH);

  try {
    for (let i = 0; i < filesToPush.length; i++) {
      const file = filesToPush[i];
      await repo.writeFile(Constants.MIGRATION_BRANCH, file.file,
          toBase64(file.content),
          `${Constants.COMMIT_MSG_PREFIX} - ${file.message}`, {encode: false});
    }

    const opts = {
      title: 'Migration Automation',
      body: pullRequestDescription,
      head: Constants.MIGRATION_BRANCH,
      base: baseBranch,
    };

    await repo.createPullRequest(opts);
  } catch (e) {
    // Delete the branch
    try {
      await repo.deleteRef(`heads/${Constants.MIGRATION_BRANCH}`);
    } catch (e) {
      console.log('Error while Rollback', e);
    }

    throw e;
  }
};

module.exports.deleteMigrationBranch = async (repoName) => {
  const token = await Parameter.githubToken();

  const gh = new GitHub({token: token}, Constants.GITHUB_URL);

  const repo = gh.getRepo(Constants.GITHUB_ORG, repoName);

  await repo.deleteRef(`heads/${Constants.MIGRATION_BRANCH}`);
};

const toBase64 = (string) => Buffer.from(string).toString('base64');
