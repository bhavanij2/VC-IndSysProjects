import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class PrivateSubnetOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createPrivateSubnet1IdOutput();
        // Output - PrivateSubnet1CIDR??
        this.createPrivateSubnet2IdOutput();
        // Output - PrivateSubnet2CIDR??
    }

    private createPrivateSubnet1IdOutput() {
        new CfnOutput(this.scope, 'PrivateSubnet1Output', {
            description: 'PrivateSubnet1',
            value: this.props.vpc.privateSubnets[0].subnetId,
            export: `${this.props.stackName}-PrivateSubnet1`
        })
            .makeImportValue()
            .toString();
    }

    private createPrivateSubnet2IdOutput() {
        new CfnOutput(this.scope, 'PrivateSubnet2Output', {
            description: 'PrivateSubnet2',
            value: this.props.vpc.privateSubnets[1].subnetId,
            export: `${this.props.stackName}-PrivateSubnet2`
        })
            .makeImportValue()
            .toString();
    }
}