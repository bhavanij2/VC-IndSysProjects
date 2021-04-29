import { Construct, ConstructNode } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export interface VpcParameterStoreOutputProps {
    parentAppNode: ConstructNode;
    vpc: ec2.VpcNetwork;
    sshSecurityGroup: ec2.CfnSecurityGroup;
    rdsSecurityGroup: ec2.CfnSecurityGroup;
}
export declare class VpcParameterStoreOutputConstruct {
    private readonly scope;
    private readonly props;
    constructor(scope: Construct, props: VpcParameterStoreOutputProps);
    private persistVpcId;
}
