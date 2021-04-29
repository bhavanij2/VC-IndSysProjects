import { Stack } from "@aws-cdk/cdk";
import { BastionInstanceConstruct } from "./bastion-instance-construct";
import ec2 = require('@aws-cdk/aws-ec2');
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";

export interface VpcBastionInstances {
    primary: BastionInstanceConstruct,
    secondary: BastionInstanceConstruct
}

export class VpcBastionInstancesConstruct {
    readonly bastionInstances: VpcBastionInstances;

    constructor(stack: Stack, vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup) {
        const primaryBastion = new BastionInstanceConstruct(stack, 'PrimaryBastionInstance', {
            stackName: stack.stackName,
            region: stack.region,
            accountId: stack.accountId,
            instanceType: InputParameterHolder.get('inputs').bastionInstanceType,
            subnet: vpc.publicSubnets[0],
            securityGroup: bastionSg,
            hostKeyName: InputParameterHolder.get('inputs').bastionHostKeyName,
            isPrimary: true
        });

        const secondaryBastion = new BastionInstanceConstruct(stack, 'SecondaryBastionInstance', {
            stackName: stack.stackName,
            region: stack.region,
            accountId: stack.accountId,
            instanceType: InputParameterHolder.get('inputs').bastionInstanceType,
            subnet: vpc.publicSubnets[1],
            securityGroup: bastionSg,
            hostKeyName: InputParameterHolder.get('inputs').bastionHostKeyName,
            isPrimary: false
        });

        this.bastionInstances = {
            primary: primaryBastion,
            secondary: secondaryBastion
        }
    }
}