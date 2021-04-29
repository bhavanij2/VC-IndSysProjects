const AWS = require('aws-sdk');
const CONSTANTS = require('./constans');

module.exports = {
    managePipeline: async (event, pipelineType) => {
        // proceed using Service Catalog
        const serviceCatalog = new AWS.ServiceCatalog();
        
        const productId = CONSTANTS.fetchServiceCatalogProductIdByPipelineType(pipelineType);
        const provisionedProductName = event.StackName;

        const provisionedProduct = await serviceCatalog.searchProvisionedProducts({
            Filters: {
                "SearchQuery": [`name:${provisionedProductName}`]
            }
        }).promise();

        if (provisionedProduct.TotalResultsCount > 1) {
            throw new Error(`Could not indentify unique provisioned product with name ${provisionedProductName}`);
        }

        var params = {
            ProductId: productId,
            ProvisionedProductName: provisionedProductName,
            ProvisioningArtifactId: await fetchProvisioningArtifactId(productId),
            ProvisioningParameters: convertCfnParamsToServiceCatalog(event.Parameters)
        }

        let operationOutput;
        if (provisionedProduct.TotalResultsCount == 0) {
            operationOutput = await serviceCatalog.provisionProduct(params).promise();
        } else {
            operationOutput = await serviceCatalog.updateProvisionedProduct(params).promise();
        }

        return operationOutput
            
    },

    getProductTemplate: async (pipelineType) => {
        console.log(`Fetcihng template of type ${pipelineType}`);
        const serviceCatalog = new AWS.ServiceCatalog();
        const productId = CONSTANTS.fetchServiceCatalogProductIdByPipelineType(pipelineType);
        const provisioningArtifactId = await fetchProvisioningArtifactId(productId);

        const describeProvisioningArtifactOutput = await serviceCatalog.describeProvisioningArtifact({
            ProductId: productId,
            ProvisioningArtifactId: provisioningArtifactId
        }).promise();

        if (!describeProvisioningArtifactOutput) {
            throw new Error(`Could not fetch information for provisionArtifact id ${provisioningArtifactId}, product id ${productId}`);
        }

        const templateUrl = describeProvisioningArtifactOutput.Info['TemplateUrl'];
        console.log(`Template url for prodcut [${productId}], provisionedArtifact [${provisioningArtifactId}]: ${templateUrl}`);
        return templateUrl;

    }
}

function convertCfnParamsToServiceCatalog(cfnParams){
    let serviceCatalogParms = [];
    cfnParams.forEach(param => serviceCatalogParms.push({
        Key: param.ParameterKey,
        Value: param.ParameterValue
    }))

    return serviceCatalogParms;

}

async function fetchProvisioningArtifactId(productId) {
    console.log(`Fetching provisioned artifact id for product ${productId}`);
    var serviceCatalog = new AWS.ServiceCatalog();
    console.log(`Describe product ${productId}`);
    const describeProductOutput = await serviceCatalog.describeProduct({
        Id: productId
    }).promise();
    if (!describeProductOutput.ProvisioningArtifacts) {
        throw new Error(`ProvisionArtifacts don't exists for product id ${productId}`);
    }
    // check how to fetch the last version
    const provisioningArtifactId = describeProductOutput.ProvisioningArtifacts[0].Id;
    return provisioningArtifactId;
}
