import { Stack } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export declare class VpcBastionInstanceSGConstruct {
    readonly bastionInstanceSecurityGroup: ec2.SecurityGroup;
    constructor(stack: Stack, vpc: ec2.VpcNetwork);
}
