import { Construct } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export interface BastionInstanceSGProps {
    stackName: string;
    groupName: string;
    vpc: ec2.VpcNetwork;
    primaryCentralBastionIP: string;
    secondaryCentralBastionIP: string;
}
export declare class BastionInstanceSGConstruct {
    private readonly props;
    readonly securityGroup: ec2.SecurityGroup;
    constructor(scope: Construct, id: string, props: BastionInstanceSGProps);
    private setupBastionSGIngressRules;
}
