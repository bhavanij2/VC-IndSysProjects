import { Stack } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
import { VcisEC2InstanceSshSGConstruct } from "./vcis-ec2-instance-ssh-sg-construct";
import { VcisRdsSGConstruct } from "./vcis-rds-sg-construct";

export class VpcSecurityGroupsConstruct {
    readonly sshSecurityGroup: ec2.CfnSecurityGroup;
    readonly rdsSecurityGroup: ec2.CfnSecurityGroup;

    constructor(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup) {
        this.sshSecurityGroup = this.createSSHSecurityGroup(stack, vpc, bastionSg);
        this.rdsSecurityGroup = this.createRdsSecurityGroup(stack, vpc, bastionSg);
    }

    private createSSHSecurityGroup(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup): ec2.CfnSecurityGroup {
        return new VcisEC2InstanceSshSGConstruct(stack, 'VcisSG', {
            stackName: stack.stackName,
            groupName: 'vcis-sg',
            vpc: vpc,
            bastionSecurityGroup: bastionSg
        }).securityGroup;
    }

    private createRdsSecurityGroup(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup): ec2.CfnSecurityGroup {
        return new VcisRdsSGConstruct(stack, 'VcisRdsSG', {
            stackName: stack.stackName,
            groupName: 'vcis-rds-sg',
            vpc: vpc,
            bastionSecurityGroup: bastionSg
        }).securityGroup;
    }
}