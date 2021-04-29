const AWS = require('aws-sdk');

module.exports = {

  validate: (CfnRequestParams) => {
    if (!CfnRequestParams.RestApiId) {
      return 'RestApiId parameter is required';
    }
    if (!CfnRequestParams.DeploymentId) {
      return 'DeploymentId parameter is required';
    }
  },

  update: async (CfnRequestParams) => {
    console.log('Params', CfnRequestParams);
    const ApiGateway = new AWS.APIGateway({apiVersion: '2015-07-09'});

    // Get the stage name from the API GW.
    const stages = await ApiGateway.getStages({restApiId: CfnRequestParams.RestApiId}).promise();

    console.log('Stages', stages);
    const stageName = stages.item.shift().stageName;

    // Update deploymentId on the stage.
    const params = {
      restApiId: CfnRequestParams.RestApiId,
      stageName: stageName,
      patchOperations: [
        {
          op: 'replace',
          path: '/deploymentId',
          value: CfnRequestParams.DeploymentId,
        },
      ],
    };

    const stage = await ApiGateway.updateStage(params).promise();
    console.log('Stage updated', stage);
    return CfnRequestParams.DeploymentId;
  },

  updateV2: async (CfnRequestParams) => {
    console.log('Params V2', CfnRequestParams);
    const ApiGateway = new AWS.ApiGatewayV2({apiVersion: '2018-11-29'});

    // Get the stage name from the API GW.
    const stages = await ApiGateway.getStages({ApiId: CfnRequestParams.RestApiId}).promise();

    console.log('Stages', stages);
    const stageName = stages.Items.shift().StageName;

    // Update deploymentId on the stage.
    const params = {
      ApiId: CfnRequestParams.RestApiId,
      StageName: stageName,
      DeploymentId: CfnRequestParams.DeploymentId,
    };

    const stage = await ApiGateway.updateStage(params).promise();
    console.log('Stage updated', stage);
    return CfnRequestParams.DeploymentId;
  },
};

