import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class PublicSubnetOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createPublicSubnet1IdOutput;
    private createPublicSubnet2IdOutput;
}
