import { Construct } from "@aws-cdk/cdk";
import { BastionInstanceConstruct } from "../bastion-instance/bastion-instance-construct";
import { AvailabilityZoneOutputConstruct } from "./availability-zone-output-construct";
import { BastionOutputConstruct } from "./bastion-output-construct";
import { SubnetOutputConstruct } from "./subnet-output-construct";
import { VpcOutputConstruct } from "./vpc-output-construct";
import ec2 = require('@aws-cdk/aws-ec2');

export interface VcisVpcOutputProps {
    stackName: string,
    bastionHostKeyName: string,
    vpc: ec2.VpcNetwork,
    primaryBastion: BastionInstanceConstruct,
    secondaryBastion: BastionInstanceConstruct
}

export class VcisVpcOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createOuputs();
    }

    private createOuputs() {
        this.createVpcOutputs();
        this.createAvailabilityZoneOutputs();
        this.createBastionOutputs();
        this.subnetOutputConstruct();
    }

    private createVpcOutputs() {
        new VpcOutputConstruct(this.scope, this.props);
    }

    private createAvailabilityZoneOutputs() {
        new AvailabilityZoneOutputConstruct(this.scope, this.props);
    }

    private createBastionOutputs() {
        new BastionOutputConstruct(this.scope, this.props);
    }

    private subnetOutputConstruct() {
        new SubnetOutputConstruct(this.scope, this.props);
    }
}