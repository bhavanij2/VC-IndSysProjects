import { Stack } from "@aws-cdk/cdk";
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";
import { BastionInstanceSGConstruct } from "./bastion-instance-sg-construct";
import ec2 = require('@aws-cdk/aws-ec2');

export class VpcBastionInstanceSGConstruct {
    readonly bastionInstanceSecurityGroup: ec2.SecurityGroup;

    constructor(stack: Stack, vpc: ec2.VpcNetwork) {
        const bastionInstanceSGConstruct = new BastionInstanceSGConstruct(stack, 'BastionSG', {
            stackName: stack.stackName,
            groupName: 'bastion-sg',
            vpc: vpc,
            primaryCentralBastionIP: (InputParameterHolder.get('inputs'))['primaryCentralBastionIP'],
            secondaryCentralBastionIP: (InputParameterHolder.get('inputs'))['secondaryCentralBastionIP']
        })
        this.bastionInstanceSecurityGroup = bastionInstanceSGConstruct.securityGroup;
    }
}