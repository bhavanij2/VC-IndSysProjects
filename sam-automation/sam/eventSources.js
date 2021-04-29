const AWS = require('aws-sdk');
const Constants = require('./constants');
const Parameter = require('migration-automation-shared').Parameter;

const SNS_ONE_TO_ONE_RELATIONSHIP = 1;
const SNS_SHARED_RELATIONSHIP = 2;

module.exports = {
  findQueues: async (input) => {
    const credentials = await Parameter.awsCredentials();
    return await doFindQueues(input, credentials);
  },
  findTopics: async (input) => {
    const credentials = await Parameter.awsCredentials();
    return await doFindTopics(input, credentials);
  },
};

const doFindQueues = async (input, credentials) => {
  const sqs = new AWS.SQS(credentials);
  const lambda = new AWS.Lambda(credentials);
  try {
    const subscriptionsMap = await findTopicsBySQS(credentials);
    const param = {
      FunctionName: input.originalFunctionArn + ':' +
          Constants.BRANCH_TO_STAGE_MAPPING.get(input.baseBranch),
    };

    const eventSources = await lambda.listEventSourceMappings(param).
        promise();

    const retVal = [];

    const sqsMappings = eventSources.EventSourceMappings;

    for (const sqsMapping of sqsMappings) {
      if (sqsMapping.EventSourceArn.match(/arn:aws:sqs/gi) != null) {
        const queueName = sqsMapping.EventSourceArn.split(':')[5];
        console.log(queueName);
        const queueUrl = await sqs.getQueueUrl({QueueName: queueName}).
            promise();
        const params = {
          QueueUrl: queueUrl.QueueUrl,
          AttributeNames: [
            'VisibilityTimeout',
            'MaximumMessageSize',
            'MessageRetentionPeriod',
            'DelaySeconds',
            'ReceiveMessageWaitTimeSeconds',
            'KmsDataKeyReusePeriodSeconds',
            'ReceiveMessageWaitTimeSeconds',
          ],
        };

        const sqsAttrs = await sqs.getQueueAttributes(params).promise();

        const topics = subscriptionsMap.get(sqsMapping.EventSourceArn);

        const sqsConf = {
          SQSArn: sqsMapping.EventSourceArn,
          SQSName: createQueueNameInNewAccount(queueName),
          QueueSAMResourceName: createQueueSAMResourceName(queueName),
          VisibilityTimeout: sqsAttrs.Attributes.VisibilityTimeout,
          MaximumMessageSize: sqsAttrs.Attributes.MaximumMessageSize,
          MessageRetentionPeriod: sqsAttrs.Attributes.MessageRetentionPeriod,
          DelaySeconds: sqsAttrs.Attributes.DelaySeconds,
          ReceiveMessageWaitTimeSeconds: sqsAttrs.Attributes.ReceiveMessageWaitTimeSeconds,
          KmsDataKeyReusePeriodSeconds: sqsAttrs.Attributes.KmsDataKeyReusePeriodSeconds,
          HasKms: sqsAttrs.Attributes.KmsDataKeyReusePeriodSeconds &&
              sqsAttrs.Attributes.KmsDataKeyReusePeriodSeconds > 0,
          Topics: topics,
          HasTopics: topics && topics.length > 0,
        };
        retVal.push(sqsConf);
      }
    }

    return retVal;
  } catch (e) {
    console.error(e);
  }
};

const findTopicsBySQS = async (credentials) => {
  const sns = new AWS.SNS(credentials);
  const subscriptionsMap = new Map();

  let topicsResponse = await sns.listTopics().promise();
  do {
    for (const t of topicsResponse.Topics) {
      if (t.TopicArn && t.TopicArn.includes('brazil-value-capture')) {
        const subscriptionsResponse = await sns.listSubscriptionsByTopic({
          TopicArn: t.TopicArn,
        }).promise();

        for (const s of subscriptionsResponse.Subscriptions) {
          if (!subscriptionsMap.get(s.Endpoint)) {
            subscriptionsMap.set(s.Endpoint, []);
          }
          s.TopicArn = updatePrefixAndAccountNumberEventSourceArn(s.TopicArn);
          subscriptionsMap.get(s.Endpoint).push(s);
        }
      }
    }
    if (topicsResponse.NextToken) {
      topicsResponse = await sns.listTopics({
        NextToken: topicsResponse.NextToken,
      }).promise();
    } else {
      topicsResponse.Topics = null;
    }
  } while (topicsResponse.Topics);

  return subscriptionsMap;
};

const getAccountNumber = (topicArn) => {
  return Constants.OLD_ACCOUNT_TO_NEW_ACCOUNT_MAP.get(topicArn.split(':')[4]);
};

/* If multiple different topics are pointing to the same lambda, could be N:1
  or N:M so that it will be defined in vcis-app-cloudformation-templates as a
  shared resource, we are not able to deduce which feature it belongs
*/
const addTopicToSet = async (topicsSet, t, subscriptionsResponse, sns) => {
  const snsConfig = await sns.getTopicAttributes({
    TopicArn: t.TopicArn,
  }).promise();

  const subscriptions = [];

  for (const s of subscriptionsResponse.Subscriptions) {
    if (s.Protocol !== 'email') {
      s.Endpoint = updatePrefixAndAccountNumberEventSourceArn(s.Endpoint);
      subscriptions.push(s);
    }
  }

  const topicConfig = {
    TopicSAMResourceName: createTopicSAMResourceName(t.TopicArn),
    TopicName: createTopicNameInNewAccount(t.TopicArn),
    DisplayName: snsConfig.Attributes.DisplayName,
    EffectiveDeliveryPolicy: snsConfig.Attributes.EffectiveDeliveryPolicy,
    Policy: snsConfig.Attributes.Policy,
    KmsMasterKeyId: snsConfig.Attributes.KmsMasterKeyId,
    HasSubscriptions: subscriptions && subscriptions.length > 0,
    Subscriptions: subscriptions,
    AccountNumber: getAccountNumber(t.TopicArn),
  };
  topicsSet.add(topicConfig);
};

const kindOfRelationship = async (
  topicArn, input, subscriptionsResponse, sns, lambda) => {
  const subscriptions = subscriptionsResponse.Subscriptions;

  let ownSqsSubscriptions = 0;
  let otherSqsSubscriptions = 0;
  let ownLambdaSubscriptions = 0;
  let otherLambdaSubscriptions = 0;

  for (const s of subscriptions) {
    const lambdaArn = input.originalFunctionArn;

    // SNS :: Lambda
    if (s.Protocol === 'lambda') {
      if (
        s.Endpoint.includes(lambdaArn + ':' +
              Constants.BRANCH_TO_STAGE_MAPPING.get(
                  input.baseBranch))) {
        ownLambdaSubscriptions++;
      } else {
        otherLambdaSubscriptions++;
      }
    }

    // SNS :: SQS :: Lambda
    if (s.Protocol === 'sqs') {
      const eventSourceMappingsResponse = await lambda.listEventSourceMappings(
          {
            EventSourceArn: s.Endpoint,
            FunctionName: lambdaArn + ':' +
                Constants.BRANCH_TO_STAGE_MAPPING.get(
                    input.baseBranch),
          }).promise();

      if (eventSourceMappingsResponse.EventSourceMappings.length > 0) {
        ownSqsSubscriptions++;
      } else {
        otherSqsSubscriptions++;
      }
    }
  }

  if (
    ((ownSqsSubscriptions == 1) || (ownLambdaSubscriptions == 1)) &&
    ((otherSqsSubscriptions + otherLambdaSubscriptions) == 0)
  ) {
    return SNS_ONE_TO_ONE_RELATIONSHIP;
  }

  let isShared = false;

  if (
    ((ownSqsSubscriptions + ownLambdaSubscriptions) > 0) &&
      ((otherSqsSubscriptions + otherLambdaSubscriptions) >= 1)
  ) {
    for (const s of subscriptions) {
      const lambdaArn = input.originalFunctionArn;

      // SNS :: Lambda
      if (s.Protocol === 'lambda' &&
          s.Endpoint.includes(lambdaArn + ':' +
              Constants.BRANCH_TO_STAGE_MAPPING.get(
                  input.baseBranch))) {
        isShared = true;
        break;
      }

      // SNS :: SQS :: Lambda
      if (s.Protocol === 'sqs') {
        const eventSourceMappingsResponse = await lambda.listEventSourceMappings(
            {
              EventSourceArn: s.Endpoint,
              FunctionName: lambdaArn + ':' +
                  Constants.BRANCH_TO_STAGE_MAPPING.get(
                      input.baseBranch),
            }).promise();

        if (eventSourceMappingsResponse.EventSourceMappings.length > 0) {
          isShared = true;
          break;
        }
      }
    }
    return isShared ? SNS_SHARED_RELATIONSHIP : -1;
  }
};

const doFindTopics = async (input, credentials) => {
  const sns = new AWS.SNS(credentials);
  const oneToOneTopics = new Set();
  const sharedTopics = new Set();
  const lambda = new AWS.Lambda(credentials);
  let response = await sns.listTopics().promise();

  do {
    // No other possibility to filter the topics, we should check one-by-one
    for (const t of response.Topics) {
      if (t.TopicArn && t.TopicArn.includes('brazil-value-capture')) {
        const subscriptionsResponse = await sns.listSubscriptionsByTopic({
          TopicArn: t.TopicArn,
        }).promise();

        const type = await kindOfRelationship(t.TopicArn, input,
            subscriptionsResponse,
            sns,
            lambda);
        if (type === SNS_ONE_TO_ONE_RELATIONSHIP) {
          await addTopicToSet(oneToOneTopics, t, subscriptionsResponse, sns);
        }
        if (type === SNS_SHARED_RELATIONSHIP) {
          await addTopicToSet(sharedTopics, t, subscriptionsResponse, sns);
        }
      }
    }

    if (response.NextToken) {
      response = await sns.listTopics({
        NextToken: response.NextToken,
      }).promise();
    } else {
      response.Topics = null;
    }
  }
  while (response.NextToken) ;
  return {OneToOneTopics: oneToOneTopics, SharedTopics: sharedTopics};
};

const toCamelCase = (string) => string.toLowerCase().
    trim().
    split(/[.\-_\s]/g).
    reduce((string, word) => string + word[0].toUpperCase() + word.slice(1));

const createQueueSAMResourceName = function(queueName) {
  const queueNameWithoutValueCapture = removeOldAccountPrefixToQueue(queueName);
  const queueNameWithoutEnv = removeEnvToQueue(queueNameWithoutValueCapture);
  const retVal = toCamelCase(queueNameWithoutEnv) + 'SQS';
  return capitalizeFirstLetter(retVal);
};

const removeOldAccountPrefixToQueue = function(queueName) {
  return queueName.substr(21, queueName.length);
};

const removeEnvToQueue = function(queueName) {
  return queueName.substr(0, queueName.lastIndexOf('-'));
};

const createQueueNameInNewAccount = function(queueName) {
  const queueNameWithoutOldPrefix = removeOldAccountPrefixToQueue(queueName);
  const queueNameWithoutEnv = removeEnvToQueue(queueNameWithoutOldPrefix);
  return 'vcis-app-' + queueNameWithoutEnv;
};

const createTopicSAMResourceName = function(topicArn) {
  const topicNameWithoutValueCapture = removeOldAccountPrefixToTopic(topicArn);
  const topicNameWithoutEnv = removeEnvToTopic(topicNameWithoutValueCapture);
  const retVal = toCamelCase(topicNameWithoutEnv) + 'SNS';
  return capitalizeFirstLetter(retVal);
};

const removeOldAccountPrefixToTopic = function(topicArn) {
  return topicArn.substr(56, topicArn.length);
};

const removeEnvToTopic = function(topicArn) {
  return topicArn.substr(0, topicArn.lastIndexOf('-'));
};

const removeEnv = function(resourceArn) {
  return resourceArn.substr(0, resourceArn.lastIndexOf('-'));
};

const createTopicNameInNewAccount = function(topicArn) {
  const topicNameWithoutOldPrefix = removeOldAccountPrefixToTopic(topicArn);
  const topicNameWithoutEnv = removeEnvToTopic(topicNameWithoutOldPrefix);
  return 'vcis-app-' + topicNameWithoutEnv;
};

const updatePrefixAndAccountNumberEventSourceArn = (eventSourceArn) => {
  let retVal = eventSourceArn.replace('brazil-value-capture', 'vcis-app');
  retVal = removeEnv(retVal);
  const oldAccountNumber = eventSourceArn.split(':')[4];
  retVal = retVal.replace(oldAccountNumber,
      Constants.OLD_ACCOUNT_TO_NEW_ACCOUNT_MAP.get(oldAccountNumber));
  return retVal;
};

const capitalizeFirstLetter = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

/*
const transformResourceSuffixToEnvironment = (suffix) => {

};
*/
