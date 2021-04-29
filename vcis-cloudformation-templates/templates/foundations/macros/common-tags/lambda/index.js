'use strict';

const TAGGABLE_RESOURCES = require('./config/taggable-resources.config.json');
const SSMService = require('./services/ssm.service');
const { tagsConfig } = require('./config/tags.config.json');

const createFailure = ({ requestId, fragment }, errorMessage = 'failed') => ({
  requestId,
  fragment,
  errorMessage,
  status: 'failed'
});

const tagResources = (resources, tags, macroParameters) => {
  Object.keys(resources).forEach(key => {
    addTagsToResource(resources[key], tags, macroParameters);
  });
};

const isResourceTaggable = resource =>
  Boolean(resource.Properties && resource.Properties.Tags) ||
  TAGGABLE_RESOURCES.includes(resource.Type);

const addTagsToResource = (resource, tags) => {
  if (isResourceTaggable(resource)) {
    if ('Properties' in resource === false) {
      resource.Properties = {};
    }
    
    if ('Tags' in resource.Properties === false) {
        switch(resource.Type) {
          case 'AWS::SSM::Parameter':
              resource.Properties.Tags = {};
              break;
          default:
              resource.Properties.Tags = [];
        }
      }
    
    tags.forEach(({ name: Key, value: Value }) => {
      if (Array.isArray(resource.Properties.Tags)){
        resource.Properties.Tags.push({ Key, Value });
      } else {
        resource.Properties.Tags[Key] = Value;
      }

    });
  }
};

const getTagsConfig = env => tagsConfig[env];
const getEnv = event => (event.templateParameterValues && event.templateParameterValues.Env) || null;

const getProjectModuleTagValue = event =>
  (event.templateParameterValues && event.templateParameterValues.ProjectModuleTag) || null;

const getResources = event => (event.fragment && event.fragment.Resources) || null;

const getMacroParameters = event => event.params || null;

exports.handler = async event => {
  const env = getEnv(event);
  if (!env) {
    return createFailure(event, 'Required Env parameter not found!');
  }

  const projectModuleTag = getProjectModuleTagValue(event);
  if (!projectModuleTag) {
    return createFailure(event, 'Required Project Module Tag not found!');
  }

  const macroParameters = getMacroParameters(event);
  const tagsConfig = getTagsConfig(env);

  const ssmParameters = await SSMService.getSSMParameters(tagsConfig);
  if (!ssmParameters) {
    return createFailure(event);
  }

  const tags = ssmParameters.map(param => {
    if (param.name in macroParameters) {
      param.value = macroParameters[param.name];
    }
    return param;
  });
  tags.push({ name: 'mon:project-module', value: projectModuleTag });

  const resources = getResources(event);
  if (!resources) {
    return createFailure(event);
  }
  tagResources(resources, tags);

  return {
    requestId: event.requestId,
    fragment: event.fragment,
    status: 'success'
  };
};
