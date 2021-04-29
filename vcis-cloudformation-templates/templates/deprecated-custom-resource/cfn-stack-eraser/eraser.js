'use strict';

const AWS = require('aws-sdk');

module.exports = {

  validate: (CfnRequestParams) => {
    if (!CfnRequestParams.StackName) {
      throw Error('StackName parameter is required');
    }
  },

  delete: async (CfnRequestParams) => {
    console.log('Params', CfnRequestParams);
    var CF = new AWS.CloudFormation();

    try {
      const info = await CF.describeStacks({ StackName: CfnRequestParams.StackName }).promise()
      if (info.Stacks.length > 1) {
        throw Error(`Could not find an unique Stack with name ${fnRequestParams.StackName}`);
      }
    } catch (err) {
      if (err.message && err.message.includes(`Stack with id ${CfnRequestParams.StackName} does not exist`)) {
        console.log(`Stack ${CfnRequestParams.StackName} does not exist. Proceeding with Service Catalog`);
        return;
      }
      console.log(err);
      throw err;
    }

    try {

      const deleteStackPromise = CF.deleteStack({
        StackName: CfnRequestParams.StackName, /* required */
        RoleARN: CfnRequestParams.RoleARN
      }).promise()

      deleteStackPromise.then(function(data) {
        console.log(`Stack ${CfnRequestParams.StackName} deletion started.`)
        const waitForPromise = CF.waitFor('stackDeleteComplete', {
          StackName: CfnRequestParams.StackName,
          $waiter: { delay: 20, maxAttempts: 30 }}).promise();
        waitForPromise.then(function(data) {
          console.log('stack creation completed')
        }).catch(function(err) {
          console.log("wait catch");
          throw err;
        })
      }).catch(function(err) {
        console.log("delete catch");
        throw err;
      });

      await deleteStackPromise;

    } catch (err) {
      throw err;
    }
  }
};