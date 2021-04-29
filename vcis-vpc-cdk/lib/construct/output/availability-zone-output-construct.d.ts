import { Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";
export declare class AvailabilityZoneOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createAZ1Output;
    private createAZ2Output;
}
