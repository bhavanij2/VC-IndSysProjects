import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class PrivateSubnetOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createPrivateSubnet1IdOutput;
    private createPrivateSubnet2IdOutput;
}
