import { Construct } from "@aws-cdk/cdk";
import { BastionInstanceConstruct } from "../bastion-instance/bastion-instance-construct";
import ec2 = require('@aws-cdk/aws-ec2');
export interface VcisVpcOutputProps {
    stackName: string;
    bastionHostKeyName: string;
    vpc: ec2.VpcNetwork;
    primaryBastion: BastionInstanceConstruct;
    secondaryBastion: BastionInstanceConstruct;
}
export declare class VcisVpcOutputConstruct {
    private readonly scope;
    private props;
    constructor(scope: Construct, props: VcisVpcOutputProps);
    private createOuputs;
    private createVpcOutputs;
    private createAvailabilityZoneOutputs;
    private createBastionOutputs;
    private subnetOutputConstruct;
}
