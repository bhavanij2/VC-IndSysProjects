import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class SubnetOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createPublicSubnetOutput;
    private createPrivateSubnetOutput;
    private createRdsSubnetOutput;
}
