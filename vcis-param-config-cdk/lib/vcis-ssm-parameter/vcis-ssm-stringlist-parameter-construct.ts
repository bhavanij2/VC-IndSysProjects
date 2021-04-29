import { StringListParameter } from "@aws-cdk/aws-ssm";
import { CfnResource, Construct, ConstructNode } from "@aws-cdk/cdk";
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";

export interface VcisSsmStringListParameterProps {
    description: string,
    name: string,
    stringListValue: string[]
}
export class VcisSsmStringListParameterConstruct {

    constructor(scope: Construct, id: string, props: VcisSsmStringListParameterProps) {
        console.log("***********************");
        console.log(props);
        const ssmParam = new StringListParameter(scope, id, {
            description: props.description,
            name: props.name,
            stringListValue: props.stringListValue
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
                "mon:regulated": InputParameterHolder.get('tags').regulated,
                "mon:data-classification": InputParameterHolder.get('tags').dataClassification,
            }
        );
    }
}