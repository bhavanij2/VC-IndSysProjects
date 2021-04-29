import { Construct } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export interface VcisEC2InstanceSshSGProps {
    stackName: string;
    groupName: string;
    vpc: ec2.VpcNetwork;
    bastionSecurityGroup: ec2.SecurityGroup;
}
export declare class VcisEC2InstanceSshSGConstruct {
    readonly securityGroup: ec2.CfnSecurityGroup;
    constructor(scope: Construct, id: string, props: VcisEC2InstanceSshSGProps);
}
