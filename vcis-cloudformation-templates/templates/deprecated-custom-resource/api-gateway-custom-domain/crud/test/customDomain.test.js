const AWS = require('aws-sdk');
const customDomain = require('../customDomain');

jest.mock('aws-sdk');


beforeEach(() => {
  jest.resetModules(); // Clear cache
});

const validParams = {
  ServiceToken:
    'arn:aws:lambda:us-east-1:578248469025:function:vcis-apigw-custom-domain-ApiGatewayCustomDomainCr-5BVJ9NY7GHY9',
  DomainName: 'user-info-update-dev.is-np.its-plus.com',
  EndpointConfiguration: {Types: ['EDGE']},
  CertificateArn:
    'arn:aws:acm:us-east-1:578248469025:certificate/680bab0d-d832-46e8-929d-43740f59584d',
};

const validV2Params = {ServiceToken:
  'arn:aws:lambda:us-east-1:578248469025:function:vcis-apigw-custom-domain-ApiGatewayCustomDomainCr-5BVJ9NY7GHY9',
Version: '2.0',
DomainName: 'grower-report-update-dev.is-np.its-plus.com',
DomainNameConfigurations:
  [{EndpointType: 'REGIONAL',
    CertificateArn:
       'arn:aws:acm:us-east-1:578248469025:certificate/680bab0d-d832-46e8-929d-43740f59584d'}]};

test('validate should return error when DomainName is not defined', async () => {
  const invalidParams = {
    CertificateArn: '7ofh2w',
  };

  try {
    customDomain.validate(invalidParams);
  } catch (e) {
    expect(e.message).toEqual(customDomain.VALIDATE_DOMAIN_NAME_REQUIRED);
  }
});


test('validate should return error when Certificate ARN is not defined', async () => {
  const invalidParams = {
    DomainName: 'boqlmygyib',
  };

  try {
    customDomain.validate(invalidParams);
  } catch (e) {
    expect(e.message).toEqual(customDomain.VALIDATE_CERTIFICATE_ARN_REQUIRED);
  }
});

test('validate should return no error when DomainName and Certificate ARN are defined', async () => {
  customDomain.validate(validParams);
});


test('create should create a custom Domain and return a dominaName object with domina name [user-info-update-dev.is-np.its-plus.com]', async () => {
  const createDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      domainName: validParams.DomainName,
      certificateArn: validParams.CertificateArn,
    }),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    createDomainName: createDomainNamePromise,
  }));


  const domainName = await customDomain.create(validParams);

  expect(domainName.DomainName).toEqual(validParams.DomainName);
});

test('create should retry MAX_RETRIES_DEFAULT+1 times and throw "Max retries attempts reached" if error occurs (different to "The domain name you provided already exists.")', async () => {
  const createDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockReturnValue(Promise.reject(new Error('Unexpected excpetion'))),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    createDomainName: createDomainNamePromise,
  }));

  try {
    await customDomain.create(validParams, 1);
  } catch (e) {
    expect(e.message).toEqual(customDomain.MAX_RETRIES_MESSAGE);
    expect(createDomainNamePromise).toHaveBeenCalledTimes(customDomain.MAX_RETRIES_DEFAULT + 1);
  }
});

test('delete should call APIGATEWAY.deleteDomain and return physicalId equal to []', async () => {
  const deleteDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      domainName: validParams.DomainName,
      certificateArn: validParams.CertificateArn,
    }),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    deleteDomainName: deleteDomainNamePromise,
  }));


  const response = await customDomain.delete(validParams);

  expect(response.PhysicalResourceId).toEqual(validParams.DomainName);
  expect(deleteDomainNamePromise).toHaveBeenCalledTimes(1);
});

test('delete should retry MAX_RETRIES_DEFAULT+1 times and throw "Max retries attempts reached")', async () => {
  const deleteDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockReturnValue(Promise.reject(new Error('Unexpected excpetion'))),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    deleteDomainName: deleteDomainNamePromise,
  }));

  try {
    await customDomain.delete(validParams, 'id', 1);
  } catch (e) {
    expect(e.message).toEqual(customDomain.MAX_RETRIES_MESSAGE);
    expect(deleteDomainNamePromise).toHaveBeenCalledTimes(customDomain.MAX_RETRIES_DEFAULT + 1);
  }
});

/* V2 */

test('create V2 should create a custom Domain and return a dominaName object with domina name [user-info-update-dev.is-np.its-plus.com]', async () => {
  const createDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      DomainName: validV2Params.DomainName,
      DomainNameConfigurations: [{ApiGatewayDomainName: 'd-ck3m529ox8.execute-api.us-east-1.amazonaws.com',
        CertificateArn: validV2Params.CertificateArn}],
    }),
  });

  AWS.ApiGatewayV2 = jest.fn().mockImplementation(() => ({
    createDomainName: createDomainNamePromise,
  }));


  const domainName = await customDomain.createV2(validV2Params);

  expect(domainName.DomainName).toEqual(validV2Params.DomainName);
});


test('create V2 should retry MAX_RETRIES_DEFAULT+1 times and throw "Max retries attempts reached" if error occurs (different to "The domain name you provided already exists.")', async () => {
  const createDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockReturnValue(Promise.reject(new Error('Unexpected excpetion'))),
  });

  AWS.ApiGatewayV2 = jest.fn().mockImplementation(() => ({
    createDomainName: createDomainNamePromise,
  }));

  try {
    await customDomain.createV2(validV2Params, 1);
  } catch (e) {
    expect(e.message).toEqual(customDomain.MAX_RETRIES_MESSAGE);
    expect(createDomainNamePromise).toHaveBeenCalledTimes(customDomain.MAX_RETRIES_DEFAULT + 1);
  }
});

test('delete V2 should call APIGATEWAY.deleteDomain and return physicalId equal to []', async () => {
  const deleteDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({}),
  });

  AWS.ApiGatewayV2 = jest.fn().mockImplementation(() => ({
    deleteDomainName: deleteDomainNamePromise,
  }));


  const response = await customDomain.deleteV2(validV2Params);

  expect(response.PhysicalResourceId).toEqual(validV2Params.DomainName);
  expect(deleteDomainNamePromise).toHaveBeenCalledTimes(1);
});

test('delete should retry MAX_RETRIES_DEFAULT+1 times and throw "Max retries attempts reached")', async () => {
  const deleteDomainNamePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockReturnValue(Promise.reject(new Error('Unexpected excpetion'))),
  });

  AWS.ApiGatewayV2 = jest.fn().mockImplementation(() => ({
    deleteDomainName: deleteDomainNamePromise,
  }));

  try {
    await customDomain.deleteV2(validV2Params, 'id', 1);
  } catch (e) {
    expect(e.message).toEqual(customDomain.MAX_RETRIES_MESSAGE);
    expect(deleteDomainNamePromise).toHaveBeenCalledTimes(customDomain.MAX_RETRIES_DEFAULT + 1);
  }
});

