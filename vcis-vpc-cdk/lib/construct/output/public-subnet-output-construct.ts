import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class PublicSubnetOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {

        this.createPublicSubnet1IdOutput();
        // Output - PublicSubnet1CIDR??
        this.createPublicSubnet2IdOutput();
        // Output - PublicSubnet2CIDR??
    }

    private createPublicSubnet1IdOutput() {
        new CfnOutput(this.scope, 'PublicSubnet1Output', {
            description: 'PublicSubnet1',
            value: this.props.vpc.publicSubnets[0].subnetId,
            export: `${this.props.stackName}-PublicSubnet1`
        })
            .makeImportValue()
            .toString();
    }

    private createPublicSubnet2IdOutput() {
        new CfnOutput(this.scope, 'PublicSubnet2Output', {
            description: 'PublicSubnet2',
            value: this.props.vpc.publicSubnets[1].subnetId,
            export: `${this.props.stackName}-PublicSubnet2`
        })
            .makeImportValue()
            .toString();
    }
}