import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class RdsSubnetOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createRdsSubnet1IdOutput();
        // Output - RdsSubnet1CIDR??
        this.createRdsSubnet2IdOutput();
        // Output - RdsSubnet2CIDR??
    }

    private createRdsSubnet1IdOutput() {
        new CfnOutput(this.scope, 'RdsSubnet1Output', {
            description: 'RdsSubnet1',
            value: this.props.vpc.isolatedSubnets[0].subnetId,
            export: `${this.props.stackName}-RdsSubnet1`
        })
            .makeImportValue()
            .toString();
    }

    private createRdsSubnet2IdOutput() {
        new CfnOutput(this.scope, 'RdsSubnet2Output', {
            description: 'RdsSubnet2',
            value: this.props.vpc.isolatedSubnets[1].subnetId,
            export: `${this.props.stackName}-RdsSubnet2`
        })
            .makeImportValue()
            .toString();
    }
}