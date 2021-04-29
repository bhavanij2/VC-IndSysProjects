module.exports = Object.freeze({
  ENVIRONMENTS: [
    {env: 'poc', account: 'non-prod'},
    {env: 'dev', account: 'non-prod'},
    {env: 'it', account: 'non-prod'},
    {env: 'prod', account: 'prod'},
  ],
  APP_CLOUDFORMATION_TEMPLATES_REPO: 'vcis-app-cloudformation-templates',
});
