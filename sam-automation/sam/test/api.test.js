const AWS = require('aws-sdk');
const Api = require('../api');

jest.mock('aws-sdk');

const swaggerWithRootPath = {
  'host': 'gkg1ib9end.execute-api.us-east-1.amazonaws.com',
  'basePath': '/dev',
  'schemes': [
    'https',
  ],
  'paths': {
    '/cancelation': {
      'post': {
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
          },
        },
        'security': [
          {
            'brazil-value-capture-ping-authorizer': [],
          },
        ],
        'x-amazon-apigateway-integration': {
          'uri': 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-cec-b2b-api:${stageVariables.environment}/invocations',
          'responses': {
            'default': {
              'statusCode': '200',
            },
          },
          'passthroughBehavior': 'when_no_match',
          'httpMethod': 'POST',
          'contentHandling': 'CONVERT_TO_TEXT',
          'type': 'aws_proxy',
        },
      },
      'get': {
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
          },
        },
        'security': [
          {
            'brazil-value-capture-ping-authorizer': [],
          },
        ],
        'x-amazon-apigateway-integration': {
          'uri': 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-cec-b2b-api:${stageVariables.environment}/invocations',
          'responses': {
            'default': {
              'statusCode': '200',
            },
          },
          'passthroughBehavior': 'when_no_match',
          'httpMethod': 'POST',
          'contentHandling': 'CONVERT_TO_TEXT',
          'type': 'aws_proxy',
        },
      },
      'options': {
        'consumes': [
          'application/json',
        ],
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
            'headers': {
              'Access-Control-Allow-Origin': {
                'type': 'string',
              },
              'Access-Control-Allow-Methods': {
                'type': 'string',
              },
              'Access-Control-Allow-Headers': {
                'type': 'string',
              },
            },
          },
        },
        'x-amazon-apigateway-integration': {
          'responses': {
            'default': {
              'statusCode': '200',
              'responseParameters': {
                'method.response.header.Access-Control-Allow-Methods': '\'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT\'',
                'method.response.header.Access-Control-Allow-Headers': '\'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token\'',
                'method.response.header.Access-Control-Allow-Origin': '\'*\'',
              },
            },
          },
          'passthroughBehavior': 'when_no_match',
          'requestTemplates': {
            'application/json': '{"statusCode": 200}',
          },
          'type': 'mock',
        },
      },
    },
  },
};

const swaggerWithFullPath = {
  'host': 'gkg1ib9end.execute-api.us-east-1.amazonaws.com',
  'basePath': '/dev',
  'schemes': [
    'https',
  ],
  'paths': {
    '/b2b/credit-consumption/cancelation': {
      'post': {
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
          },
        },
        'security': [
          {
            'brazil-value-capture-ping-authorizer': [],
          },
        ],
        'x-amazon-apigateway-integration': {
          'uri': 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-cec-b2b-api:${stageVariables.environment}/invocations',
          'responses': {
            'default': {
              'statusCode': '200',
            },
          },
          'passthroughBehavior': 'when_no_match',
          'httpMethod': 'POST',
          'contentHandling': 'CONVERT_TO_TEXT',
          'type': 'aws_proxy',
        },
      },
      'get': {
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
          },
        },
        'security': [
          {
            'brazil-value-capture-ping-authorizer': [],
          },
        ],
        'x-amazon-apigateway-integration': {
          'uri': 'arn:aws:apigateway:us-east-1:lambda:path/2015-03-31/functions/arn:aws:lambda:us-east-1:285453578300:function:brazil-value-capture-cec-b2b-api:${stageVariables.environment}/invocations',
          'responses': {
            'default': {
              'statusCode': '200',
            },
          },
          'passthroughBehavior': 'when_no_match',
          'httpMethod': 'POST',
          'contentHandling': 'CONVERT_TO_TEXT',
          'type': 'aws_proxy',
        },
      },
      'options': {
        'consumes': [
          'application/json',
        ],
        'produces': [
          'application/json',
        ],
        'responses': {
          '200': {
            'description': '200 response',
            'schema': {
              '$ref': '#/definitions/Empty',
            },
            'headers': {
              'Access-Control-Allow-Origin': {
                'type': 'string',
              },
              'Access-Control-Allow-Methods': {
                'type': 'string',
              },
              'Access-Control-Allow-Headers': {
                'type': 'string',
              },
            },
          },
        },
        'x-amazon-apigateway-integration': {
          'responses': {
            'default': {
              'statusCode': '200',
              'responseParameters': {
                'method.response.header.Access-Control-Allow-Methods': '\'DELETE,GET,HEAD,OPTIONS,PATCH,POST,PUT\'',
                'method.response.header.Access-Control-Allow-Headers': '\'Content-Type,Authorization,X-Amz-Date,X-Api-Key,X-Amz-Security-Token\'',
                'method.response.header.Access-Control-Allow-Origin': '\'*\'',
              },
            },
          },
          'passthroughBehavior': 'when_no_match',
          'requestTemplates': {
            'application/json': '{"statusCode": 200}',
          },
          'type': 'mock',
        },
      },
    },
  },
};


beforeEach(() => {
  jest.resetModules(); // Clear cache
});


test('apiGwMethods should return two methods when export has one resource, one mock and two methods', async () => {
  const getExportPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({body: JSON.stringify(swaggerWithRootPath)}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getExport: getExportPromise,
  }));

  const result = await Api.apiGwMethods({originalFunctionArn: 'brazil-value-capture-cec-b2b-api', originalRestApiId: 'restApi', originalRestApiStageName: 'dev'}, {});

  const expected = [
    {resourceName: 'CancelationPostMethod', method: 'POST', hasAuth: true, parentKey: 'CancelationPath'},
    {resourceName: 'CancelationGetMethod', method: 'GET', hasAuth: true, parentKey: 'CancelationPath'},
  ];

  expect(result).toEqual(expected);
});

test('apiGwMethods should return two methods when export has multiple resources, one mock and two methods', async () => {
  const getExportPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({body: JSON.stringify(swaggerWithFullPath)}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getExport: getExportPromise,
  }));

  const result = await Api.apiGwMethods({originalFunctionArn: 'brazil-value-capture-cec-b2b-api', originalRestApiId: 'restApi', originalRestApiStageName: 'dev'}, {});

  const expected = [
    {resourceName: 'B2bcreditconsumptioncancelationPostMethod', method: 'POST', hasAuth: true, parentKey: 'B2bcreditconsumptioncancelationPath'},
    {resourceName: 'B2bcreditconsumptioncancelationGetMethod', method: 'GET', hasAuth: true, parentKey: 'B2bcreditconsumptioncancelationPath'},
  ];

  expect(result).toEqual(expected);
});
