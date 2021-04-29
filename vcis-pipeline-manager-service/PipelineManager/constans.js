const pipelineTypeMap = new Map();
pipelineTypeMap.set('SamCiCdPipeline','VcisAppSamCiCdPipelineServiceCatalogProduct');
pipelineTypeMap.set('InfraCiCdPipeline','VcisAppInfraCiCdPipelineServiceCatalogProduct');

module.exports = {
    fetchServiceCatalogProductIdByPipelineType: (pipelineTypeKey) => {
        const prodKey = pipelineTypeMap.get(pipelineTypeKey);
        if (!prodKey) {
            throw new Error(`Invalid Pipeline type ${pipelineType}`);
        }

        return process.env[prodKey];
    } 
}