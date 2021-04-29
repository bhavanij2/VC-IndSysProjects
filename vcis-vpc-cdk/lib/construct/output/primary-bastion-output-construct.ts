import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class PrimaryBastionOutputConstruct {
    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createPrimaryBastionIPOutput();
        this.createPrimaryBastionDNSOutput();
    }

    private createPrimaryBastionIPOutput() {
        new CfnOutput(this.scope, 'PrimaryBastionIPOutput', {
            description: 'Primary Bastion Host IP',
            value: this.props.primaryBastion.instanceEIP.eipIp,
            export: `${this.props.stackName}-PrimaryBastionIP`
        })
            .makeImportValue()
            .toString();
    }

    private createPrimaryBastionDNSOutput() {
        new CfnOutput(this.scope, 'PrimaryBastionDNSOutput', {
            description: 'Primary Bastion DNS entry',
            value: this.props.primaryBastion.instance.instancePublicDnsName,
            export: `${this.props.stackName}-PrimaryBastionDNS`
        })
            .makeImportValue()
            .toString();
    }
}