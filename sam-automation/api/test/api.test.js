const AWS = require('aws-sdk');
const Api = require('../api');

jest.mock('aws-sdk');
jest.mock('migration-automation-shared');

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


test('apiGwResources should return one resource and mock when export has one resource, mock and method and path is included', async () => {
  const getExportPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({body: JSON.stringify(swaggerWithRootPath)}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getExport: getExportPromise,
  }));

  const result = await Api.apiGwResources({pathsToInclude: ['/cancelation']});

  const expected = [{resourceName: 'CancelationPath',
    path: 'cancelation',
    parent: null,
    isRoot: true,
    methods: [{resourceName: 'CancelationOptionsMethod', method: 'OPTIONS', hasAuth: false}],
    relativePath: '/cancelation'}];


  expect(result).toEqual(expected);
});

test('apiGwResources should return resource with parents attached and mock on last resource when export has multiple resources, one mock and one method and path is included', async () => {
  const getExportPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({body: JSON.stringify(swaggerWithFullPath)}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getExport: getExportPromise,
  }));

  const result = await Api.apiGwResources({pathsToInclude: ['/b2b/credit-consumption/cancelation']});

  const expected = [
    {resourceName: 'B2bPath',
      path: 'b2b',
      parent: null,
      isRoot: true,
      methods: null,
      relativePath: '/b2b'},
    {resourceName: 'B2bcreditconsumptionPath',
      path: 'credit-consumption',
      parent: 'B2bPath',
      isRoot: false,
      methods: null,
      relativePath: '/b2b/credit-consumption'},
    {resourceName: 'B2bcreditconsumptioncancelationPath',
      path: 'cancelation',
      parent: 'B2bcreditconsumptionPath',
      isRoot: false,
      methods: [{resourceName: 'B2bcreditconsumptioncancelationOptionsMethod', method: 'OPTIONS', hasAuth: false}],
      relativePath: '/b2b/credit-consumption/cancelation'},
  ];


  expect(result).toEqual(expected);
});


test('apiGwResources should return no resource when export has one resource, mock and method and path is not included', async () => {
  const getExportPromise = jest.fn().mockReturnValue({
    promise: jest.fn().mockResolvedValue({body: JSON.stringify(swaggerWithRootPath)}),
  });

  AWS.APIGateway = jest.fn().mockImplementation(() => ({
    getExport: getExportPromise,
  }));

  const result = await Api.apiGwResources({pathsToInclude: ['/path/that/not/exists']});

  expect(result).toEqual([]);
});
