const axios = require('axios');
const AWS = require('aws-sdk');
const lambda = require('../lambda');

jest.mock('axios');
jest.mock('aws-sdk');

const OLD_ENV = process.env;

beforeEach(() => {
  jest.resetModules(); // Clear cache
  process.env = {...OLD_ENV};
  delete process.env.NODE_ENV;
});

afterEach(() => {
  process.env = OLD_ENV;
  axios.post.mockClear();
});


test('handler should send to slack sqs message', async () => {
  const paramName = 'ssm_hook';
  process.env.SLACK_WEBHOOK_SSM = paramName;

  const ssmGetParameterPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({
      Parameter: {
        Name: paramName,
        Type: 'String',
        Value: 'hook',
        Version: 1,
        LastModifiedDate: 1546551668.495,
        ARN: 'arn:aws:ssm:ap-southeast-2:123:NAME',
      },
    }),
  });

  AWS.SSM = jest.fn().mockImplementation(() => ({
    getParameter: ssmGetParameterPromise,
  }));


  axios.post.mockResolvedValue(true);

  const context = {functionName: 'name', invokedFunctionArn: 'name:MM_NP'};

  const input = {
    'Records': [
      {
        'Sns': {
          'Message': '{"AlarmName":"vcis-sqs-lambda-ExecutionTimeAlarm-1NT6R9G19QK6X","AlarmDescription":null,"AWSAccountId":"578248469025","NewStateValue":"ALARM","NewStateReason":"Threshold Crossed: 1 datapoint [5707.43 (29/07/19 04:41:00)] was greater than or equal to the threshold (5000.0).","StateChangeTime":"2019-07-29T04:43:04.817+0000","Region":"US East (N. Virginia)","OldStateValue":"OK","Trigger":{"MetricName":"Duration","Namespace":"AWS/Lambda","StatisticType":"Statistic","Statistic":"AVERAGE","Unit":null,"Dimensions":[{"value":"vcis-sqs-lambda-ProcessStage-1SRMGZ2O17P6Y","name":"FunctionName"}],"Period":60,"EvaluationPeriods":1,"ComparisonOperator":"GreaterThanOrEqualToThreshold","Threshold":5000.0,"TreatMissingData":"","EvaluateLowSampleCountPercentile":""}}',
          'Timestamp': '2019-07-29T04:43:04.942Z',
        },
      },
    ],
  };

  await lambda.handler(input, context);

  const expectedMessage = {
    'attachments': [
      {
        '_batchMessageLink': null,
        'fallback': '',
        'color': 'danger',
        'pretext': '',
        'title': null,
        'author_name': null,
        'author_link': null,
        'author_icon': '',
        'text': '*Data*\n' +
        '```{ AlarmName: \'vcis-sqs-lambda-ExecutionTimeAlarm-1NT6R9G19QK6X\',\n' +
        '  AlarmDescription: null,\n' +
        '  AWSAccountId: \'578248469025\',\n' +
        '  NewStateValue: \'ALARM\',\n' +
        '  NewStateReason:\n' +
        '   \'Threshold Crossed: 1 datapoint [5707.43 (29/07/19 04:41:00)] was greater than or equal to the threshold (5000.0).\',\n' +
        '  StateChangeTime: \'2019-07-29T04:43:04.817+0000\',\n' +
        '  Region: \'US East (N. Virginia)\',\n' +
        '  OldStateValue: \'OK\',\n' +
        '  Trigger:\n' +
        '   { MetricName: \'Duration\',\n' +
        '     Namespace: \'AWS/Lambda\',\n' +
        '     StatisticType: \'Statistic\',\n' +
        '     Statistic: \'AVERAGE\',\n' +
        '     Unit: null,\n' +
        '     Dimensions:\n' +
        '      [ { value: \'vcis-sqs-lambda-ProcessStage-1SRMGZ2O17P6Y\',\n' +
        '          name: \'FunctionName\' } ],\n' +
        '     Period: 60,\n' +
        '     EvaluationPeriods: 1,\n' +
        '     ComparisonOperator: \'GreaterThanOrEqualToThreshold\',\n' +
        '     Threshold: 5000,\n' +
        '     TreatMissingData: \'\',\n' +
        '     EvaluateLowSampleCountPercentile: \'\' } }```',
        'image_url': '',
        'thumb_url': '',
        'footer': '',
        'ts': 1564375384,
      },
    ],
    'text': '*Alarm*',
  };

  expect(axios.post.mock.calls.length).toBe(1);
  expect(axios.post.mock.calls[0][0]).toBe('hook');
  expect(axios.post.mock.calls[0][1]).toEqual(expectedMessage);
});


