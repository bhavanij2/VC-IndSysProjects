"use strict";

const serviceCatalogHandler = require('./serviceCatalogHandler');
const cloudFormationHandler = require('./cloudFormationHandler');

exports.handler = async (event, context) => {
    console.log("REQUEST RECEIVED:\n" + JSON.stringify(event));
    let procResponse;
    try {

        if (!event.body) {
            throw new Error("Invalid request");
        }

        const body = JSON.parse(event.body);
        const pipelineType = event.pathParameters.pipelineType;
        try {
            // proceed using CloudFormation
            procResponse = await cloudFormationHandler.managePipeline(body, pipelineType);
        } catch (e) {
            if (e.message && e.message.includes(`Stack with id ${body.StackName} does not exist`)) {
                // proceed using service catalog
                console.log(`Stack ${body.StackName} does not exist. Proceeding with Service Catalog`);
                procResponse = await serviceCatalogHandler.managePipeline(body, pipelineType);
            } else {
                throw e;
            }
        }

        console.log("SUCCESS");

        return {
            'statusCode': 200,
            'body': JSON.stringify(procResponse),
            'headers': {
                'Content-Type': 'application/json'
            }
        };

    } catch (err) {
        console.error(err);
        return {
            'statusCode': 500,
            'body': {
                'error': err.message
            },
            'headers': {
                'Content-Type': 'application/json'
            }
        }
    }
}

