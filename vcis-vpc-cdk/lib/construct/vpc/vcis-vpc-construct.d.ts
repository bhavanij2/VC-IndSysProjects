import { Construct } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
interface VcisVpcProps {
    vpcCidr: string;
    maxAZs?: number;
}
export declare class VcisVpcConstruct {
    private static readonly DEFAULT_MAX_AZs;
    readonly vpc: ec2.VpcNetwork;
    constructor(scope: Construct, id: string, props: VcisVpcProps);
}
export {};
