import { Stack } from "@aws-cdk/cdk";
import { BastionInstanceConstruct } from "./bastion-instance-construct";
import ec2 = require('@aws-cdk/aws-ec2');
export interface VpcBastionInstances {
    primary: BastionInstanceConstruct;
    secondary: BastionInstanceConstruct;
}
export declare class VpcBastionInstancesConstruct {
    readonly bastionInstances: VpcBastionInstances;
    constructor(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup);
}
