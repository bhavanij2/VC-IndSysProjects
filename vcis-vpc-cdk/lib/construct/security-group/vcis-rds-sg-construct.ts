import { CfnSecurityGroup, Protocol } from "@aws-cdk/aws-ec2";
import { Construct, Tag } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
import cdk = require('@aws-cdk/cdk');

export interface VcisRdsSGProps {
    stackName: string,
    groupName: string,
    vpc: ec2.VpcNetwork,
    bastionSecurityGroup: ec2.SecurityGroup
}

export class VcisRdsSGConstruct {
    readonly securityGroup: ec2.CfnSecurityGroup;

    constructor(scope: Construct, id: string, props: VcisRdsSGProps) {

        this.securityGroup = new ec2.CfnSecurityGroup(scope, id, {
            groupName: props.groupName,
            vpcId: props.vpc.vpcId,
            groupDescription: 'Allow access to RDS instances',
            securityGroupIngress: this.getIngressRules(props.vpc, props.bastionSecurityGroup),
            securityGroupEgress: this.getOutgressRules()
        });
        this.securityGroup.node.apply(new Tag('Name', `${props.stackName}/${props.groupName}`));
    }


    private getOutgressRules() {
        return [
            {
                ipProtocol: Protocol.All,
                cidrIp: '0.0.0.0/0'
            }
        ];
    }

    private getIngressRules(vpc: ec2.VpcNetwork, bastionSecurityGroup: ec2.SecurityGroup) {
        const ingressRules: Array<CfnSecurityGroup.IngressProperty> = this.createIngressRulesFromBastionServers(bastionSecurityGroup);
        this.addIngressRulesFromPrivateSubnets(ingressRules, vpc);
        return ingressRules;
    }



    private createIngressRulesFromBastionServers(bastionSecurityGroup: ec2.SecurityGroup): CfnSecurityGroup.IngressProperty[] {
        return [
            {
                ipProtocol: Protocol.Tcp,
                sourceSecurityGroupId: bastionSecurityGroup.securityGroupId,
                fromPort: 6379,
                toPort: 6379,
                description: 'allow Redis access from Bastion servers'
            },
            {
                ipProtocol: Protocol.Tcp,
                sourceSecurityGroupId: bastionSecurityGroup.securityGroupId,
                fromPort: 3306,
                toPort: 3306,
                description: 'allow Aurora access from Bastion servers'
            },
            {
                ipProtocol: Protocol.Tcp,
                sourceSecurityGroupId: bastionSecurityGroup.securityGroupId,
                fromPort: 5432,
                toPort: 5432,
                description: 'allow Postgres access from Bastion servers'
            }
        ];
    }

    private addIngressRulesFromPrivateSubnets(ingressRules: CfnSecurityGroup.IngressProperty[], vpc: ec2.VpcNetwork) {
        const privateCfnSubnetResources: ec2.CfnSubnet[] = vpc.privateSubnets.map(subnet => this.findCfnSubnetResource(subnet));
        const privateSubnetCidrBlocks: string[] = privateCfnSubnetResources.map(cfnSubnetResource => cfnSubnetResource['properties']['cidrBlock']);

        privateSubnetCidrBlocks.forEach(cidrBlock => ingressRules.push(
            {
                ipProtocol: Protocol.Tcp,
                cidrIp: cidrBlock,
                fromPort: 6379,
                toPort: 6379,
                description: 'allow Redis access from Private Subnet'
            },
            {
                ipProtocol: Protocol.Tcp,
                cidrIp: cidrBlock,
                fromPort: 3306,
                toPort: 3306,
                description: 'allow Aurora access from Private Subnet'
            },
            {
                ipProtocol: Protocol.Tcp,
                cidrIp: cidrBlock,
                fromPort: 5432,
                toPort: 5432,
                description: 'allow Postgres access from Private Subnet'
            }
        ));
    }


    private findCfnSubnetResource(subnet: ec2.IVpcSubnet): ec2.CfnSubnet {
        return subnet.node.children.find(child => (child as cdk.CfnResource).resourceType === 'AWS::EC2::Subnet') as ec2.CfnSubnet;
    }
}