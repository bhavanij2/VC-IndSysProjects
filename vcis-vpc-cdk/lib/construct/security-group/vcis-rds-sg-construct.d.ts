import { Construct } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
export interface VcisRdsSGProps {
    stackName: string;
    groupName: string;
    vpc: ec2.VpcNetwork;
    bastionSecurityGroup: ec2.SecurityGroup;
}
export declare class VcisRdsSGConstruct {
    readonly securityGroup: ec2.CfnSecurityGroup;
    constructor(scope: Construct, id: string, props: VcisRdsSGProps);
    private getOutgressRules;
    private getIngressRules;
    private createIngressRulesFromBastionServers;
    private addIngressRulesFromPrivateSubnets;
    private findCfnSubnetResource;
}
