import { Stack } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export declare class VpcSecurityGroupsConstruct {
    readonly sshSecurityGroup: ec2.CfnSecurityGroup;
    readonly rdsSecurityGroup: ec2.CfnSecurityGroup;
    constructor(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup);
    private createSSHSecurityGroup;
    private createRdsSecurityGroup;
}
