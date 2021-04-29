import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { PrimaryBastionOutputConstruct } from "./primary-bastion-output-construct";
import { SecondaryBastionOutputConstruct } from "./secondary-bastion-output-construct";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class BastionOutputConstruct {
    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createBastionHostKeyNameOutput();
        this.createBastionSecurityGroupOutput();
        this.createPrimaryBastionOutput();
        this.createSecondaryBastionOutput();
    }

    private createBastionHostKeyNameOutput() {
        new CfnOutput(this.scope, 'BastionHostKeyNameOutput', {
            description: 'Key name used for the VPC\'s bastion hosts',
            value: this.props.bastionHostKeyName,
            export: `${this.props.stackName}-BastionHostKeyName`
        })
            .makeImportValue()
            .toString();
    }

    private createBastionSecurityGroupOutput() {
        new CfnOutput(this.scope, 'BastionSGOutput', {
            description: 'Bastion Host security group.  Other servers in this VPC should only accept SSH traffic from this group',
            value: this.props.primaryBastion.securityGroup.securityGroupName,
            export: `${this.props.stackName}-BastionSG`
        })
            .makeImportValue()
            .toString();
    }

    private createPrimaryBastionOutput() {
        new PrimaryBastionOutputConstruct(this.scope, this.props);
    }

    private createSecondaryBastionOutput() {
        new SecondaryBastionOutputConstruct(this.scope, this.props);
    }
}