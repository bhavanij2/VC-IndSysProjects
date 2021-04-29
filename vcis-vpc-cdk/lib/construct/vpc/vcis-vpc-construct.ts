import { Construct } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');

interface VcisVpcProps {
    vpcCidr: string,
    maxAZs?: number,
}

export class VcisVpcConstruct {
    private static readonly DEFAULT_MAX_AZs = 2;
    readonly vpc: ec2.VpcNetwork;

    constructor(scope: Construct, id: string, props: VcisVpcProps) {

        if (!props.vpcCidr) {
            throw new Error('Error: VPC CIDR Input is required.');
        }

        if(!props.maxAZs) {
            props.maxAZs = VcisVpcConstruct.DEFAULT_MAX_AZs;
        }

        this.vpc = new ec2.VpcNetwork(scope, id, {
            cidr: props.vpcCidr,
            maxAZs: props.maxAZs,
            subnetConfiguration: [
                {
                    cidrMask: 24,
                    name: 'public',
                    subnetType: ec2.SubnetType.Public,
                },
                {
                    cidrMask: 24,
                    name: 'rds',
                    subnetType: ec2.SubnetType.Isolated,
                },
                {
                    cidrMask: 22,
                    name: 'private',
                    subnetType: ec2.SubnetType.Private,
                }

            ],
        });

    }
}