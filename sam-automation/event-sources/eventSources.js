const AWS = require('aws-sdk');
const Constants = require('./constants');
const Parameter = require('migration-automation-shared').Parameter;

module.exports = {
  fetchQueuesConfiguration: async (queues) => {
    const credentials = await Parameter.awsCredentials();
    return await doFetchQueuesConfiguration(queues, credentials);
  },
  fetchTopicsConfiguration: async (input) => {
    const credentials = await Parameter.awsCredentials();
    return await doFetchTopicsConfiguration(input, credentials);
  },
};

const doFetchQueuesConfiguration = async (input, credentials) => {
  const sqs = new AWS.SQS(credentials);
  const sns = new AWS.SNS(credentials);
  try {
    const retVal = [];
    if (input.queues) {
      for (const queue of input.queues) {
        console.log(queue);
        const queueUrl = await sqs.getQueueUrl({QueueName: queue.name}).promise();

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

        const topics = new Set();
        if (queue.topicsArns) {
          for (const t of queue.topicsArns) {
            const subscriptionsResponse = await sns.listSubscriptionsByTopic({
              TopicArn: t,
            }).promise();

            await addTopicToSet(topics, {TopicArn: t}, subscriptionsResponse,
                sns);
          }
        }

        const sqsConf = {
          SQSName: createQueueNameInNewAccount(queue.name),
          QueueSAMResourceName: createQueueSAMResourceName(queue.name),
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

const getAccountNumber = (topicArn) => {
  return Constants.OLD_ACCOUNT_TO_NEW_ACCOUNT_MAP.get(topicArn.split(':')[4]);
};

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

const doFetchTopicsConfiguration = async (input, credentials) => {
  const sns = new AWS.SNS(credentials);
  const retVal = new Set();

  for (const t of input.topics) {
    const subscriptionsResponse = await sns.listSubscriptionsByTopic({
      TopicArn: t,
    }).promise();

    await addTopicToSet(retVal, {TopicArn: t}, subscriptionsResponse, sns);
  }
  return retVal;
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
