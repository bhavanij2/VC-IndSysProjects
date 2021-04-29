import { Construct } from "@aws-cdk/cdk";
export declare class TagParamConfigConstruct extends Construct {
    private readonly scope;
    private static TAGS_SSM_PARAM_PATH_HOLDER;
    private static TAGS_INPUT_PARAMS_HOLDER;
    constructor(scope: Construct, id: string);
    private persistOwnerTag;
    private persistCostCenterTag;
    private persistProjectTag;
    private persistEnvironmentTag;
    private persistRegulatedTag;
    private persistDataClassificationTag;
}
