import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class RdsSubnetOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createRdsSubnet1IdOutput;
    private createRdsSubnet2IdOutput;
}
