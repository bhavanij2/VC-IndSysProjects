import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class BastionOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createBastionHostKeyNameOutput;
    private createBastionSecurityGroupOutput;
    private createPrimaryBastionOutput;
    private createSecondaryBastionOutput;
}
