const AWS = require('aws-sdk');

module.exports = {
  awsCredentials: async () => {
    const ssm = new AWS.SSM();
    const ssmParam = {
      Name: process.env.AWS_CREDENTIALS_SSM_PARAMETER_NAME,
      WithDecryption: true,
    };
    const parameter = await ssm.getParameter(ssmParam).promise();
    return JSON.parse(parameter.Parameter.Value);
  },

  githubToken: async () => {
    const ssm = new AWS.SSM();
    const ssmParam = {
      Name: process.env.GITHUB_TOKEN_PARAMETER_NAME,
      WithDecryption: true,
    };
    const parameter = await ssm.getParameter(ssmParam).promise();
    return parameter.Parameter.Value;
  },
};
