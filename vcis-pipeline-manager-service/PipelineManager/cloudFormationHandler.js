const AWS = require('aws-sdk');
const serviceCatalogHandler = require('./serviceCatalogHandler');

module.exports = {
    managePipeline: async (event, pipelineType) => {
        var cloudformation = new AWS.CloudFormation();
        console.log(`Describe stack ${event.StackName}`);
        const info = await cloudformation.describeStacks({ StackName: event.StackName }).promise()
        if (info.Stacks.length > 1) {
            throw new Error(`Could not find an unique Stack with name ${event.stackName}`);
        }

        const status = info.Stacks[0].StackStatus;

        let params = {
            StackName: event.StackName,
            Capabilities: ['CAPABILITY_IAM', 'CAPABILITY_AUTO_EXPAND'],
            TemplateURL: await serviceCatalogHandler.getProductTemplate(pipelineType),
            Parameters: event.Parameters
        }

        let operationOutput;
        if (status === 'CREATE_COMPLETE' || status === 'UPDATE_COMPLETE' || status === 'UPDATE_ROLLBACK_COMPLETE') {
            console.log(`Stack ${event.StackName} already exist, updating it with params ${JSON.stringify(params)}...`);
            operationOutput = await cloudformation.updateStack(params).promise();
        } else {
            console.log(`Creating stack ${event.StackName}`);
            operationOutput = await cloudformation.createStack(params).promise();
        }

        return {
            StackName: event.StackName,
            StackId: operationOutput.StackId,
            Status: `${(status === 'CREATE_COMPLETE' || status === 'UPDATE_COMPLETE') ? 'UPDATE' : 'CREATE'}`
        }

    }
}