const AWS = require('aws-sdk');
const stage = require('../stage');

jest.mock('aws-sdk');


beforeEach(() => {
  jest.resetModules(); // Clear cache
});


test('validate should return error when RestApiId is not defined', async () => {
  const params = {
    DeploymentId: '7ofh2w',
  };

  try {
    stage.validate(params);
  } catch (e) {
    expect(e.message).toEqual('RestApiId parameter is required');
  }
});


test('validate should return error when DeploymentId is not defined', async () => {
  const params = {
    RestApiId: 'boqlmygyib',
  };

  try {
    stage.validate(params);
  } catch (e) {
    expect(e.message).toEqual('DeploymentId parameter is required');
  }
});

test('validate should return no error when RestApiId and DeploymentId is defined', async () => {
  const params = {
    RestApiId: 'boqlmygyib',
    DeploymentId: '7ofh2w',
  };

  stage.validate(params);
});


test('update should update last stage [Prod] from rest api with Id [boqlmygyib] with Deployment Id [7ofh2w] and return [deploymentNewId] when params are boqlmygyib and 7ofh2w', async () => {
  const params = {
    RestApiId: 'boqlmygyib',
    DeploymentId: '7ofh2w',
  };

  const getStagesPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      item: [{
        deploymentId: '24xvqp',
        stageName: 'Prod',
      }]}),
  });

  const updateStagePromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getStages: getStagesPromise,
    updateStage: updateStagePromise,
  }));


  const deploymentId = await stage.update(params);

  expect(deploymentId).toEqual(params.DeploymentId);
});

