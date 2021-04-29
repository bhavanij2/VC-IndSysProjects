
const AWS = require('aws-sdk');
const eraser = require('../eraser');

jest.mock('aws-sdk');


beforeEach(() => {
  jest.resetModules(); // Clear cache
});


test('validate should return error when StackName is not defined', async () => {
  const params = {
  };

  try {
    eraser.validate(params);
  } catch (e) {
    expect(e.message).toEqual('StackName parameter is required');
  }
});

test('validate should return no error when StackName is defined', async () => {
  const params = {
    StackName: 'vcis-app-an-stack',
  };

  stage.validate(params);
});