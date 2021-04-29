import { Construct } from "@aws-cdk/cdk";
import ec2 = require("@aws-cdk/aws-ec2");
export interface BastionInstanceInputProperties {
    stackName: string;
    region: string;
    accountId: string;
    instanceType: string;
    subnet: ec2.IVpcSubnet;
    securityGroup: ec2.SecurityGroup;
    hostKeyName: string;
    isPrimary: boolean;
}
export declare class BastionInstanceConstruct {
    private readonly scope;
    private readonly id;
    private readonly props;
    readonly securityGroup: ec2.SecurityGroup;
    readonly instance: ec2.CfnInstance;
    readonly instanceEIP: ec2.CfnEIP;
    constructor(scope: Construct, id: string, props: BastionInstanceInputProperties);
    private getAmi;
    private getBastionInstanceUserData;
    private validateStackInputParams;
    private getSecondaryInstanceUserData;
    private getPrimaryInstanceUserData;
}
