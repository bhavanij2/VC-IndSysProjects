'use strict';
const axios = require('axios');
const eraser = require('./eraser');



exports.handler = async function (event, context) {
  console.log('REQUEST RECEIVED:\n' + JSON.stringify(event))

  try {
    eraser.validate(event.ResourceProperties);

    if (event.RequestType === 'Delete') {
      console.log('DELETE!')
      await eraser.delete(event.ResourceProperties);
    }

    await sendResponse(event, context, 'SUCCESS', { } );
  } catch (e) {
    console.log(e);
    await sendResponse(event, context, 'FAILED', { } );
  }
}

async function sendResponse (event, context, responseStatus, responseData, physicalResourceId) {

  var reason = responseStatus == 'FAILED' ? ('See the details in CloudWatch Log Stream: ' + context.logStreamName) : undefined;

  var responseBody = JSON.stringify({
    StackId: event.StackId,
    RequestId: event.RequestId,
    Status: responseStatus,
    Reason: reason,
    PhysicalResourceId: physicalResourceId || context.logStreamName,
    LogicalResourceId: event.LogicalResourceId,
    Data: responseData
  });

  var responseOptions = {
    headers: {
      'Content-Type': '',
      'Content-Length': responseBody.length
    }
  };

  console.info('Response body:\n', responseBody);

  try {
    await axios.put(event.ResponseURL, responseBody, responseOptions);

    console.info('CloudFormationSendResponse Success');
  } catch (error) {
    console.error('CloudFormationSendResponse Error:');

    if (error.response) {
      console.error(error.response.data);
      console.error(error.response.status);
      console.error(error.response.headers);
    } else if (error.request) {
      console.error(error.request);
    } else {
      console.error('Error', error.message);
    }

    console.error(error.config);

    throw new Error('Could not send CloudFormation response');
  }
}
