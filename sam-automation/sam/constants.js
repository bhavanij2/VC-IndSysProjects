const branchToStageMap = new Map();
branchToStageMap.set('develop', 'DEV');
branchToStageMap.set('test', 'TEST');
branchToStageMap.set('master', 'PROD');

const branchToEnvMap = new Map();
branchToEnvMap.set('develop', 'dev');
branchToEnvMap.set('test', 'it');
branchToEnvMap.set('master', 'prod');

const envToAccountMap = new Map();
envToAccountMap.set('poc', 'non-prod');
envToAccountMap.set('dev', 'non-prod');
envToAccountMap.set('it', 'non-prod');
envToAccountMap.set('prod', 'prod');

const resourceSuffixToEnvMap = new Map();
resourceSuffixToEnvMap.set('dev', 'dev');
resourceSuffixToEnvMap.set('DEV', 'dev');
resourceSuffixToEnvMap.set('test', 'it');
resourceSuffixToEnvMap.set('TEST', 'it');
resourceSuffixToEnvMap.set('it', 'it');
resourceSuffixToEnvMap.set('IT', 'it');
resourceSuffixToEnvMap.set('prod', 'prod');
resourceSuffixToEnvMap.set('PROD', 'prod');

const oldAccountToNewAccountMap = new Map();
oldAccountToNewAccountMap.set('285453578300', '578248469025');
oldAccountToNewAccountMap.set('350260138091', '820712698669');

module.exports = Object.freeze({
  ENVIRONMENTS: [
    {env: 'poc', account: 'non-prod'},
    {env: 'dev', account: 'non-prod'},
    {env: 'it', account: 'non-prod'},
    {env: 'prod', account: 'prod'},
  ],
  FUNCTION_ORIGINAL_PREFIX: 'brazil-value-capture',
  FUNCTION_NEW_PREFIX: 'vcis-app',
  BRANCH_TO_STAGE_MAPPING: branchToStageMap,
  BRANCH_TO_ENV_MAPPING: branchToEnvMap,
  ENV_TO_ACCOUNT_MAPPING: envToAccountMap,
  APP_CLOUDFORMATION_TEMPLATES_REPO: 'vcis-app-cloudformation-templates',
  OLD_ACCOUNT_TO_NEW_ACCOUNT_MAP: oldAccountToNewAccountMap,
  RESOURCE_SUFFIX_TO_ENV_MAP: resourceSuffixToEnvMap,
  SQS_NON_PROD_PREFIX_ORIGINAL: 'https://sqs.us-east-1.amazonaws.com/285453578300/brazil-value-capture',
  SQS_PROD_PREFIX_ORIGINAL: 'https://sqs.us-east-1.amazonaws.com/350260138091/brazil-value-capture',
  SNS_NON_PROD_PREFIX_ORIGINAL: 'https://sns.us-east-1.amazonaws.com/285453578300/brazil-value-capture',
  SNS_PROD_PREFIX_ORIGINAL: 'https://sns.us-east-1.amazonaws.com/350260138091/brazil-value-capture',
  SQS_NON_PROD_PREFIX_NEW: 'https://sqs.us-east-1.amazonaws.com/578248469025/vcis-app',
  SQS_PROD_PREFIX_NEW: 'https://sqs.us-east-1.amazonaws.com/820712698669/vcis-app',
  SNS_NON_PROD_PREFIX_NEW: 'https://sns.us-east-1.amazonaws.com/578248469025/vcis-app',
  SNS_PROD_PREFIX_NEW: 'https://sns.us-east-1.amazonaws.com/820712698669/vcis-app',
});
