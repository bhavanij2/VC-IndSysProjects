import { Construct, Tag } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');

export interface BastionInstanceSGProps {
    stackName: string,
    groupName: string,
    vpc: ec2.VpcNetwork,
    primaryCentralBastionIP: string,
    secondaryCentralBastionIP: string
}

export class BastionInstanceSGConstruct {
    readonly securityGroup: ec2.SecurityGroup;

    constructor(scope: Construct, id: string, private readonly props: BastionInstanceSGProps) {

        this.securityGroup = new ec2.SecurityGroup(scope, id, {
            groupName: props.groupName,
            vpc: this.props.vpc,
            description: "Bastion Host security group. Other servers in this VPC should only accept SSH traffic from this group",
            allowAllOutbound: true
        });
        this.setupBastionSGIngressRules();
    }

    private setupBastionSGIngressRules() {
        if (!this.props.primaryCentralBastionIP) {
            throw new Error('Error: Primary Central Bastion IP Input Parameter is required.')
        }

        this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${this.props.primaryCentralBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from central bastion primary instance');

        if (this.props.secondaryCentralBastionIP) {
            this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${this.props.secondaryCentralBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from central bastion secondary instance');
        }

        this.securityGroup.node.apply(new Tag('Name', `${this.props.stackName}/${this.props.groupName}`));
    }
}