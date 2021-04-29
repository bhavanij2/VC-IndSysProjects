const CfnResponse = require('cfn-response-promise');

exports.handler = async function(event, context) {
  console.log('REQUEST RECEIVED:\n' + JSON.stringify(event));
  if (!event.Records[0].body) {
    throw new Error('Invalid request');
  }

  const body = JSON.parse(event.Records[0].body);
  return await CfnResponse.send(body, context, CfnResponse.FAILED, {}, event.PhysicalResourceId );
};

