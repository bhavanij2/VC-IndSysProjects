import { Protocol } from "@aws-cdk/aws-ec2";
import { Construct, Tag } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');

export interface VcisEC2InstanceSshSGProps {
    stackName: string,
    groupName: string,
    vpc: ec2.VpcNetwork,
    bastionSecurityGroup: ec2.SecurityGroup
}

export class VcisEC2InstanceSshSGConstruct {
    readonly securityGroup: ec2.CfnSecurityGroup;

    constructor(scope: Construct, id: string, props: VcisEC2InstanceSshSGProps) {
        this.securityGroup = new ec2.CfnSecurityGroup(scope, id, {
            groupName: props.groupName,
            vpcId: props.vpc.vpcId,
            groupDescription: 'Allow ssh access to ec2 instances',
            securityGroupIngress: [
                {
                    ipProtocol: Protocol.Tcp,
                    sourceSecurityGroupId: props.bastionSecurityGroup.securityGroupId,
                    fromPort: 22,
                    toPort: 22,
                    description: 'allow ssh access from Primary Bastion Server - SG'
                }
            ],
            securityGroupEgress: [
                {
                    ipProtocol: Protocol.All,
                    cidrIp: '0.0.0.0/0'
                }
            ]
        });
        this.securityGroup.node.apply(new Tag('Name', `${props.stackName}/${props.groupName}`));

        // Commented L2 Security Group since it does not support creation of Ingress Rules with SecurityGroup Ingress Rule parameters. Implementing the same using L1 version above. But leaving this code here so that we can move to L2 version once CDK team supports this caveat.
        
        // this.securityGroup = new ec2.SecurityGroup(scope, id, {
        //     groupName: props.groupName,
        //     vpc: props.vpc,
        //     description: 'Allow ssh access to ec2 instances',
        //     allowAllOutbound: true
        // });
        // this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${props.primaryBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from Primary Bastion Server');
        // this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${props.secondaryBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from Secondary Bastion Server');
        // this.securityGroup.connections.addSecurityGroup(this.props.bastionSecurityGroup);
    }
}