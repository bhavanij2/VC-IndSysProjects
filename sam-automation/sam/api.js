const AWS = require('aws-sdk');

module.exports.apiGwMethods = async (input, credentials) => {
  if (!input.originalRestApiId || !input.originalRestApiStageName) return [];

  const apiGateway = new AWS.APIGateway(credentials);

  const params = {
    exportType: 'swagger',
    restApiId: input.originalRestApiId,
    stageName: input.originalRestApiStageName,
    parameters: {
      extensions: 'integrations',
    },
  };
  const apiGatewayExport = await apiGateway.getExport(params).promise();

  const swagger = JSON.parse(apiGatewayExport.body.toString());
  return parseSwagger(swagger, input.originalFunctionArn);
};

const parseSwagger = (swagger, originalFunctionArn) => {
  const methods = [];

  Object.keys(swagger.paths).forEach((path) => {
    const item = swagger.paths[path];

    // Filter by Function
    if (!pathIsFromFunction(item, originalFunctionArn)) return;

    createMethods(path, item, methods);
  });

  return methods;
};

const createMethods = (path, item, methods) => {
  Object.keys(item).forEach((method) => {
    if (!methodIsProxy(item, method)) return;
    methods.push({
      resourceName: `${escapeAndCapitalizeFirstLetter(path)}${escapeAndCapitalizeFirstLetter(method)}Method`,
      method: method.toUpperCase(),
      hasAuth: item[method].security != null,
      parentKey: `${escapeAndCapitalizeFirstLetter(path)}Path`,
    });
  });
};

const methodIsProxy = (item, method) => item[method]['x-amazon-apigateway-integration'].type == 'aws_proxy';

const escapeAndCapitalizeFirstLetter = (string) => {
  const stringEscaped = string.replace(/[^a-z0-9]+/gi, '');
  return stringEscaped[0].toUpperCase() + stringEscaped.slice(1);
};

const pathIsFromFunction = (path, arn) => {
  return Object.keys(path).find((method) => {
    const integration = path[method]['x-amazon-apigateway-integration'];
    return (integration && integration.uri && integration.uri.includes(arn));
  }) != null;
};
