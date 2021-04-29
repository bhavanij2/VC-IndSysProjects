const CfnResponse = require('cfn-response-promise');
const CustomDomain = require('./customDomain');

const createHandler = async (CfnRequestParams, RequestPhysicalID) => {
  if (CfnRequestParams.Version === '2.0') {
    return await CustomDomain.createV2(CfnRequestParams, RequestPhysicalID);
  } else {
    return await CustomDomain.create(CfnRequestParams, RequestPhysicalID);
  }
};

const deleteHandler = async (CfnRequestParams, RequestPhysicalID) => {
  if (CfnRequestParams.Version === '2.0') {
    return await CustomDomain.deleteV2(CfnRequestParams, RequestPhysicalID);
  } else {
    return await CustomDomain.delete(CfnRequestParams, RequestPhysicalID);
  }
};

exports.handler = async function(event, context) {
  console.log('REQUEST RECEIVED:\n' + JSON.stringify(event));

  try {
    CustomDomain.validate(event.ResourceProperties);
    let response = {};

    if (event.RequestType === 'Delete') {
      console.log(event.RequestType);
      response = await deleteHandler(event.ResourceProperties, event.RequestPhysicalID);
    }

    if (event.RequestType === 'Update') {
      console.log(event.RequestType);
      response = await deleteHandler(event.ResourceProperties, event.RequestPhysicalID);
      response = await createHandler(event.ResourceProperties, event.RequestPhysicalID);
    }

    if (event.RequestType === 'Create') {
      console.log(event.RequestType);
      response = await createHandler(event.ResourceProperties, event.RequestPhysicalID);
    }

    return await CfnResponse.send(
        event, context, CfnResponse.SUCCESS, response, event.PhysicalResourceId,
    );
  } catch (e) {
    console.log(e);
    if ( e.message !== CustomDomain.MAX_RETRIES_MESSAGE ) {
      return await CfnResponse.send(
          event, context, CfnResponse.FAILED, e, event.PhysicalResourceId,
      );
    }
    throw e;
  }
};

