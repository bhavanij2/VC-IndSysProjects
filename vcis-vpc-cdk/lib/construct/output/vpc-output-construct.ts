import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class VpcOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createVpcIdOutput();
        this.createVpcCidrOutput();
    }

    private createVpcIdOutput() {
        new CfnOutput(this.scope, 'VPCIDOutput', {
            description: 'VPCID',
            value: this.props.vpc.vpcId,
            export: `${this.props.stackName}-VpcId`
        })
            .makeImportValue()
            .toString();
    }

    private createVpcCidrOutput() {
        new CfnOutput(this.scope, 'VPCCIDROutput', {
            description: 'The CIDR range for the overall VPC',
            value: this.props.vpc.cidr,
            export: `${this.props.stackName}-VpcCidr`
        })
            .makeImportValue()
            .toString();
    }
}