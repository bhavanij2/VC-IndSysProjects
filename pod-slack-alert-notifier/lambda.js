const AWS = require('aws-sdk');
const slackBuilder = require('./slack-builder');
const axios = require('axios');

exports.handler = async (input, context) => {
  console.log('Receiving INPUT and CONTEXT', JSON.stringify(input),
      JSON.stringify(context));

  try {
    const message = slackBuilder.message(input);

    if (message) {
      await sendMessageToSlack(message);
    }
  } catch (e) {
    console.log('POD Slack Notifier ERROR Log', e);
  };
};

const sendMessageToSlack = async (message) => {
  const webhook = await getWebhook();
  await axios.post(webhook, message, {encoding: 'utf-8'});
};

const getWebhook = async () => {
  const ssm = new AWS.SSM();
  const params = {Name: process.env.SLACK_WEBHOOK_SSM};
  const ssmWebhookParameter = await ssm.getParameter(params).promise();
  return ssmWebhookParameter.Parameter.Value;
};

