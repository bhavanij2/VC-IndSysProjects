import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class SecondaryBastionOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createSecondaryBastionIpOutput();
        this.createSecondaryBastionDNSOutput();
    }

    private createSecondaryBastionIpOutput() {
        new CfnOutput(this.scope, 'SecondaryBastionIPOutput', {
            description: 'Secondary Bastion Host IP',
            value: this.props.secondaryBastion.instanceEIP.eipIp,
            export: `${this.props.stackName}-SecondaryBastionIP`
        })
            .makeImportValue()
            .toString();
    }

    private createSecondaryBastionDNSOutput() {
        new CfnOutput(this.scope, 'SecondaryBastionDNSOutput', {
            description: 'Secondary Bastion Host DNS entry',
            value: this.props.secondaryBastion.instance.instancePublicDnsName,
            export: `${this.props.stackName}-SecondaryBastionDNS`
        })
            .makeImportValue()
            .toString();
    }
}