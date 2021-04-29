import cdk = require("@aws-cdk/cdk");
import { Construct, Fn } from "@aws-cdk/cdk";
import { AmiLookupCustomResource } from "../../custom-resource/amilookup-custom-resource";
import ec2 = require("@aws-cdk/aws-ec2");

export interface BastionInstanceInputProperties {
    stackName: string,
    region: string,
    accountId: string,
    instanceType: string,
    subnet: ec2.IVpcSubnet,
    securityGroup: ec2.SecurityGroup;
    hostKeyName: string,
    isPrimary: boolean,
}

export class BastionInstanceConstruct {
    readonly securityGroup: ec2.SecurityGroup;
    readonly instance: ec2.CfnInstance;
    readonly instanceEIP: ec2.CfnEIP;

    constructor(private readonly scope: Construct, private readonly id: string, private readonly props: BastionInstanceInputProperties) {
        this.validateStackInputParams();

        this.securityGroup = props.securityGroup;
        const ami = this.getAmi(props.region, props.accountId);
        this.instance = new ec2.CfnInstance(scope, id, {
            imageId: ami.getAtt('Id').toString(),
            userData: Fn.base64(this.getBastionInstanceUserData(props.isPrimary)),
            keyName: props.hostKeyName,
            securityGroupIds: [props.securityGroup.securityGroupId],
            instanceType: props.instanceType,
            subnetId: props.subnet.subnetId,
        });
        this.instance.node.apply(new cdk.Tag('Name', `${props.stackName}/${id}`));

        // CfnEIP Resource doesn't support tags currently
        this.instanceEIP = new ec2.CfnEIP(scope, `${id}EIP`, {
            domain: 'vpc',
            instanceId: this.instance.instanceId
        });
    }

    private getAmi = (region: string, accountId: string) => {
        return new AmiLookupCustomResource(this.scope, `${this.id}-AMILookup`, {
            serviceToken: `arn:aws:lambda:${region}:${accountId}:function:FindCurrentAmi`,
            amiNamePrefix: "mon-amzn-2",
            region: region
        });
    }

    private getBastionInstanceUserData = (isPrimaryInstance: boolean) =>
        isPrimaryInstance
            ? this.getPrimaryInstanceUserData()
            : this.getSecondaryInstanceUserData();


    private validateStackInputParams() {
        if (!this.props.hostKeyName) {
            throw new Error('Error: Bastion Host Key Name Input Parameter is required.');
        }
        if (!this.props.instanceType) {
            throw new Error('Error: Bastion Instance Type Input Parameter is required.');
        }
    }

    private getSecondaryInstanceUserData() {
        return `
    #!/bin/bash -v
    yum update -y --security
    yum update -y aws*
    echo #!/bin/sh > /etc/cron.daily/yum-security.cron
    echo "yum -y update yum" >> /etc/cron.daily/yum-security.cron
    echo "yum --security -y update" >> /etc/cron.daily/yum-security.cron
    chmod +x /etc/cron.daily/yum-security.cron
    shutdown -P now
    # EOF
    `;
    }

    private getPrimaryInstanceUserData() {
        return `
    #!/bin/bash -v
    yum update -y --security
    yum update -y aws*
    echo #!/bin/sh > /etc/cron.daily/yum-security.cron
    echo "yum -y update yum" >> /etc/cron.daily/yum-security.cron
    echo "yum --security -y update" >> /etc/cron.daily/yum-security.cron
    chmod +x /etc/cron.daily/yum-security.cron
    # EOF
    `;
    }
}