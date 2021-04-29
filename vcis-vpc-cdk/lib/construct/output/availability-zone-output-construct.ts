import { CfnOutput, Construct } from "@aws-cdk/cdk";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class AvailabilityZoneOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createAZ1Output();
        this.createAZ2Output();
    }

    private createAZ1Output() {
        new CfnOutput(this.scope, 'AvailabilityZone1Output', {
            description: 'AvailabilityZone1',
            value: this.props.vpc.availabilityZones[0],
            export: `${this.props.stackName}-AvailabilityZone1`
        })
            .makeImportValue()
            .toString();
    }

    private createAZ2Output() {
        new CfnOutput(this.scope, 'AvailabilityZone2Output', {
            description: 'AvailabilityZone2',
            value: this.props.vpc.availabilityZones[1],
            export: `${this.props.stackName}-AvailabilityZone2`
        })
            .makeImportValue()
            .toString();
    }
}