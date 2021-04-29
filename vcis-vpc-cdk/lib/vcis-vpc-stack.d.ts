import cdk = require('@aws-cdk/cdk');
import { VcisApp, VcisStack } from '@monsantoit/vcis-cdk-utils';
import ec2 = require('@aws-cdk/aws-ec2');
export interface VcisVpcStackOutput {
    vpc: ec2.VpcNetwork;
    sshSecurityGroup: ec2.CfnSecurityGroup;
    rdsSecurityGroup: ec2.CfnSecurityGroup;
}
export declare class VcisVpcStack extends VcisStack<cdk.StackProps, VcisVpcStackOutput> {
    constructor(app: VcisApp, id: string, props?: cdk.StackProps);
    private createVpcSecurityGroups;
    private persistVpcOutputInParameterStore;
    private export;
}
