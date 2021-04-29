import { Construct } from "@aws-cdk/cdk";
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";
import { VcisSsmStringParameterConstruct } from "../vcis-ssm-parameter/vcis-ssm-string-parameter-construct";

export class TagParamConfigConstruct extends Construct {

    private static TAGS_SSM_PARAM_PATH_HOLDER = 'tags-ssm-param-path';
    private static TAGS_INPUT_PARAMS_HOLDER = "tags";

    constructor(private readonly scope: Construct, id: string) {
        super(scope, id);

        this.persistOwnerTag();
        this.persistCostCenterTag();
        this.persistProjectTag();
        this.persistEnvironmentTag();
        this.persistRegulatedTag();
        this.persistDataClassificationTag();
    }

    private persistOwnerTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'ownerTagSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).owner,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).owner,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).owner
        });
    }

    private persistCostCenterTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'costCenterSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).costCenter,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).costCenter,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).costCenter
        });
    }

    private persistProjectTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'projectSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).project,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).project,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).project
        });
    }

    private persistEnvironmentTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'environmentSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).environment,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).environment,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).environment
        });
    }

    private persistRegulatedTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'regulatedSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).regulated,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).regulated,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).regulated
        });
    }

    private persistDataClassificationTag() {
        new VcisSsmStringParameterConstruct(this.scope, 'dataClassificationSsmParam', {
            description: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).dataClassification,
            name: InputParameterHolder.get(TagParamConfigConstruct.TAGS_SSM_PARAM_PATH_HOLDER).dataClassification,
            stringValue: InputParameterHolder.get(TagParamConfigConstruct.TAGS_INPUT_PARAMS_HOLDER).dataClassification
        });
    }
}