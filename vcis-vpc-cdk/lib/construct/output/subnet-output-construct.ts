import { Construct } from "@aws-cdk/cdk";
import { PrivateSubnetOutputConstruct } from "./private-subnet-output-construct";
import { PublicSubnetOutputConstruct } from "./public-subnet-output-construct";
import { RdsSubnetOutputConstruct } from "./rds-subnet-output-construct";
import { VcisVpcOutputProps } from "./vcis-vpc-output-construct";

export class SubnetOutputConstruct {

    constructor(private readonly scope: Construct, private props: VcisVpcOutputProps) {
        this.createPublicSubnetOutput();
        this.createPrivateSubnetOutput();
        this.createRdsSubnetOutput();
    }

    private createPublicSubnetOutput() {
        new PublicSubnetOutputConstruct(this.scope, this.props);
    }

    private createPrivateSubnetOutput() {
        new PrivateSubnetOutputConstruct(this.scope, this.props);
    }

    private createRdsSubnetOutput() {
        new RdsSubnetOutputConstruct(this.scope, this.props);
    }
}