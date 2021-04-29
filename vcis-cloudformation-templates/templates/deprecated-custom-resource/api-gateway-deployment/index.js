const CfnLambda = require('cfn-lambda');
const Stage = require('./stage');


// eslint-disable-next-line new-cap
exports.handler = CfnLambda({

  AsyncCreate: async (CfnRequestParams) => {
    if (CfnRequestParams.Version === '2.0') {
      await Stage.updateV2(CfnRequestParams);
    } else {
      await Stage.update(CfnRequestParams);
    }
  },
  AsyncUpdate: async (RequestPhysicalID, CfnRequestParams, OldCfnRequestParams) => {
    if (CfnRequestParams.Version === '2.0') {
      await Stage.updateV2(CfnRequestParams);
    } else {
      await Stage.update(CfnRequestParams);
    }
  },
  Delete: (RequestPhysicalID, CfnRequestParams, reply) => reply(null, RequestPhysicalID),

  Validate: Stage.validate,
});

