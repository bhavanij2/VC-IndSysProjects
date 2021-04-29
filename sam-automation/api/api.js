const AWS = require('aws-sdk');
const Parameter = require('migration-automation-shared').Parameter;

module.exports.apiGwResources = async (input) => {
  const credentials = await Parameter.awsCredentials();

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
  return parseSwagger(input.pathsToInclude, swagger);
};

const parseSwagger = (pathsToInclude, swagger) => {
  const apiGwResources = [];

  Object.keys(swagger.paths).forEach((path) => {
    if (!pathsToInclude.includes(path)) return;

    const item = swagger.paths[path];

    let relativePath = '';

    const resources = path.split('/');
    // Remove first (/)
    resources.shift();

    resources.forEach((resource, index) => {
      const parentRelativePath = relativePath;
      relativePath += `/${resource}`;

      // Last resource
      let methods = null;
      if (index == resources.length-1) {
        methods = createMethods(item, resource, relativePath);
      }

      createResource(apiGwResources, resource, methods, relativePath, parentRelativePath);
    });
  });

  return apiGwResources;
};

const createMethods = (item, resource, relativePath) => {
  const methods = [];
  Object.keys(item).forEach((method) => {
    if (!methodIsMock(item, method)) return; // Process only mocks
    methods.push({
      resourceName: `${escapeAndCapitalizeFirstLetter(relativePath)}${escapeAndCapitalizeFirstLetter(method)}Method`,
      method: method.toUpperCase(),
      hasAuth: item[method].security != null,
    });
  });
  return methods;
};

const createResource = (apiGwResources, path, methods, relativePath, parentRelativePath) => {
  const resourceAlreadyProcess = apiGwResources.find((r) => r.relativePath == relativePath);
  if (resourceAlreadyProcess != null) return;
  const parentResource = apiGwResources.find((r) => r.relativePath == parentRelativePath);
  apiGwResources.push({
    resourceName: `${escapeAndCapitalizeFirstLetter(relativePath)}Path`,
    path: path,
    parent: parentResource != null ? parentResource.resourceName : null,
    isRoot: parentResource == null,
    methods: methods,
    relativePath: relativePath,
  });
};

const methodIsMock = (item, method) => item[method]['x-amazon-apigateway-integration'].type == 'mock';

const escapeAndCapitalizeFirstLetter = (string) => {
  const stringEscaped = string.replace(/[^a-z0-9]+/gi, '');
  return stringEscaped[0].toUpperCase() + stringEscaped.slice(1);
};

