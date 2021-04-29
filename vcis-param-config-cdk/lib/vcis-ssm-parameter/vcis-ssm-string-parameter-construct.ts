import { StringParameter } from "@aws-cdk/aws-ssm";
import { CfnResource, Construct, ConstructNode } from "@aws-cdk/cdk";
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";

export interface VcisSsmStringParameterProps {
    description: string,
    name: string,
    stringValue: string
}
export class VcisSsmStringParameterConstruct {

    constructor(scope: Construct, id: string, props: VcisSsmStringParameterProps) {
        const ssmParam = new StringParameter(scope, id, {
            description: props.description,
            name: props.name,
            stringValue: props.stringValue
        });
        this.applyTagsToCfnResource(ssmParam.node);
    }

    private applyTagsToCfnResource(node: ConstructNode): void {
        const cfResource = node.children.find(child => child as CfnResource !== undefined) as CfnResource;
        cfResource.addPropertyOverride('Tags',
            {
                "mon:owner": InputParameterHolder.get('tags').owner,
                "mon:cost-center": InputParameterHolder.get('tags').costCenter,
                "mon:project": InputParameterHolder.get('tags').project,
                "mon:env": InputParameterHolder.get('tags').environment,
                "mon:regulated": InputParameterHolder.get('tags').regulated,
                "mon:data-classification": InputParameterHolder.get('tags').dataClassification,
            }
        );
    }
}