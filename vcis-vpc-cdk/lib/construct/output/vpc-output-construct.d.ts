import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class VpcOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createVpcIdOutput;
    private createVpcCidrOutput;
}
