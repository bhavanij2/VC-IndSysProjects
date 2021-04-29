import { Construct } from "@aws-cdk/cdk";
export interface VcisSsmStringListParameterProps {
    description: string;
    name: string;
    stringListValue: string[];
}
export declare class VcisSsmStringListParameterConstruct {
    constructor(scope: Construct, id: string, props: VcisSsmStringListParameterProps);
    private applyTagsToCfnResource;
}
