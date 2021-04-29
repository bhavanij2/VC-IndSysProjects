const SSM = require('aws-sdk/clients/ssm');

const loadSSMParameters = async tagsConfig => {
  const params = await new SSM().getParameters({
    Names: tagsConfig.map(({ parameterPath }) => parameterPath),
    WithDecryption: false
  });
  return params.promise();
};

const getSSMParameters = async (tagsConfig) => {
  const { Parameters } = await loadSSMParameters(tagsConfig);
  const tags = Parameters.map(param => {
    return {
      name: tagsConfig.find(tag => tag.parameterPath === param.Name).name,
      value: param.Value
    }
  });
  
  return tags;
};

module.exports = { getSSMParameters };
