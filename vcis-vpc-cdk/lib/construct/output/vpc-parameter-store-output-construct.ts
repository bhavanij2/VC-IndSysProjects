import { Construct, ConstructNode } from "@aws-cdk/cdk";
import ec2 = require('@aws-cdk/aws-ec2');
import ssm = require('@aws-cdk/aws-ssm');
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";

export interface VpcParameterStoreOutputProps {
    parentAppNode: ConstructNode,
    vpc: ec2.VpcNetwork,
    sshSecurityGroup: ec2.CfnSecurityGroup,
    rdsSecurityGroup: ec2.CfnSecurityGroup
}

export class VpcParameterStoreOutputConstruct {

    constructor(private readonly scope: Construct, private readonly props: VpcParameterStoreOutputProps) {
        this.persistVpcId();
    }

    private persistVpcId() {
        const vpcIdParamPath = (InputParameterHolder.get('outputs'))['vpcIdParamStoreOutput'];
       
        new ssm.StringParameter(this.scope, 'vpcIdSsmParam', {
            description: vpcIdParamPath,
            name: vpcIdParamPath,
            stringValue: this.props.vpc.vpcId,
        });
    }
}