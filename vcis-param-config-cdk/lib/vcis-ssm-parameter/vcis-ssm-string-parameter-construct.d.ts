import { Construct } from "@aws-cdk/cdk";
export interface VcisSsmStringParameterProps {
    description: string;
    name: string;
    stringValue: string;
}
export declare class VcisSsmStringParameterConstruct {
    constructor(scope: Construct, id: string, props: VcisSsmStringParameterProps);
    private applyTagsToCfnResource;
}
