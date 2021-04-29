const AWS = require('aws-sdk');
const MAX_RETRIES_DEFAULT = 5;
const RETRIES_INTERVAL_DEFAULT = 90000;
const MAX_RETRIES_MESSAGE = 'Max retries attempts reached.';
const VALIDATE_DOMAIN_NAME_REQUIRED = 'DomainName parameter is required';
const VALIDATE_CERTIFICATE_ARN_REQUIRED = 'CertificateArn parameter is required';


const callCreateWithRetry = async (
    apigwClient, createParams, getParams, attempt, maxRetries, retryInterval) => {
  try {
    return await apigwClient.createDomainName(createParams).promise();
  } catch (e) {
    if (e.message && e.message === 'The domain name you provided already exists.') {
      return await apigwClient.getDomainName(getParams).promise();
    }

    console.log(e);
    if (attempt >= maxRetries) {
      console.log(MAX_RETRIES_MESSAGE);
      throw new Error(MAX_RETRIES_MESSAGE);
    }
    await new Promise(
        (resolve) => setTimeout(resolve, (1.5 ** attempt++) * retryInterval));
    return await callCreateWithRetry(
        apigwClient, createParams, getParams, attempt, maxRetries, retryInterval,
    );
  }
};

const callDeleteWithRetry = async (apigwClient, params, attempt, maxRetries, retryInterval) => {
  try {
    return await apigwClient.deleteDomainName(params).promise();
  } catch (e) {
    if (e.code && e.code === 'NotFoundException') {
      return;
    }

    console.log(e);
    if (attempt >= maxRetries) {
      console.log(MAX_RETRIES_MESSAGE);
      throw new Error(MAX_RETRIES_MESSAGE);
    }
    await new Promise(
        (resolve) => setTimeout(resolve, (1.5 ** attempt++) * retryInterval));
    return await callDeleteWithRetry(apigwClient, params, attempt, maxRetries, retryInterval);
  }
};


module.exports = {

  MAX_RETRIES_DEFAULT: MAX_RETRIES_DEFAULT,
  MAX_RETRIES_MESSAGE: MAX_RETRIES_MESSAGE,
  VALIDATE_CERTIFICATE_ARN_REQUIRED: VALIDATE_CERTIFICATE_ARN_REQUIRED,
  VALIDATE_DOMAIN_NAME_REQUIRED: VALIDATE_DOMAIN_NAME_REQUIRED,

  validate: (CfnRequestParams) => {
    if (!CfnRequestParams.DomainName) {
      return VALIDATE_DOMAIN_NAME_REQUIRED;
    }
    if (!CfnRequestParams.CertificateArn) {
      return VALIDATE_CERTIFICATE_ARN_REQUIRED;
    }
  },

  create: async (CfnRequestParams, RetryInterval) => {
    console.log('Params', CfnRequestParams);

    const ApiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

    const customDomain = await callCreateWithRetry(ApiGateway,
        {
          domainName: CfnRequestParams.DomainName,
          certificateArn: CfnRequestParams.CertificateArn,
          endpointConfiguration: {
            types: CfnRequestParams.EndpointConfiguration.Types,
          },
        },
        {
          domainName: CfnRequestParams.DomainName,
        },
        0, MAX_RETRIES_DEFAULT, RetryInterval || RETRIES_INTERVAL_DEFAULT);

    console.log('Custom domain created/updated', customDomain);
    return {
      DomainName: customDomain.domainName,
      DistributionDomainName: customDomain.distributionDomainName,
      DistributionHostedZoneId: customDomain.distributionHostedZoneId,
    };
  },

  delete: async (CfnRequestParams, RequestPhysicalID, RetryInterval) => {
    console.log('Params', CfnRequestParams);

    const ApiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

    const customDomain = await callDeleteWithRetry(ApiGateway,
        {
          domainName: CfnRequestParams.DomainName,
        },
        0, MAX_RETRIES_DEFAULT, RetryInterval || RETRIES_INTERVAL_DEFAULT);

    console.log('Custom domain deleted', customDomain);
    return {
      PhysicalResourceId: RequestPhysicalID || CfnRequestParams.DomainName,
    };
  },

  createV2: async (CfnRequestParams, RetryInterval) => {
    console.log('Params V2', CfnRequestParams);

    const ApiGatewayV2 = new AWS.ApiGatewayV2({apiVersion: '2018-11-29'});

    const customDomain = await callCreateWithRetry(ApiGatewayV2,
        {
          DomainName: CfnRequestParams.DomainName,
          DomainNameConfigurations: CfnRequestParams.DomainNameConfigurations,
        },
        {
          DomainName: CfnRequestParams.DomainName,
        },
        0, MAX_RETRIES_DEFAULT, RetryInterval || RETRIES_INTERVAL_DEFAULT);

    console.log('Custom domain created/updated', customDomain);
    return {
      DomainName: customDomain.DomainName,
      RegionalDomainName: customDomain.DomainNameConfigurations[0].ApiGatewayDomainName,
    };
  },

  deleteV2: async (CfnRequestParams, RequestPhysicalID, RetryInterval) => {
    console.log('Params V2', CfnRequestParams);

    const ApiGatewayV2 = new AWS.ApiGatewayV2({apiVersion: '2018-11-29'});

    const customDomain = await callDeleteWithRetry(ApiGatewayV2,
        {
          DomainName: CfnRequestParams.DomainName,
        },
        0, MAX_RETRIES_DEFAULT, RetryInterval || RETRIES_INTERVAL_DEFAULT);

    console.log('Custom domain deleted', customDomain);
    return {
      PhysicalResourceId: RequestPhysicalID || CfnRequestParams.DomainName,
    };
  },
};

