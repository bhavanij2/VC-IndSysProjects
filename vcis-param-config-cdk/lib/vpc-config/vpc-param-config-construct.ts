import cdk = require('@aws-cdk/cdk');
import { Construct } from '@aws-cdk/cdk';
import { InputParameterHolder } from '@monsantoit/vcis-cdk-utils';
import { VcisSsmStringParameterConstruct } from '../vcis-ssm-parameter/vcis-ssm-string-parameter-construct';

export class VpcParamConfigConstruct extends cdk.Construct {

    private static VPC_SSM_PARAMS_PATH_HOLDER = 'vpc-ssm-param-path';
    private static VPC_INPUT_PARAMS_HOLDER = 'vpc';

    constructor(private readonly scope: Construct, id: string) {
        super(scope, id);

        this.persistVpcCidr();
        this.persistPrimaryCentralBastionIP();
        this.persistSecondaryCentralBastionIP();
        this.persistBastionHostKeyName();
        this.persistBastionInstanceType();
    }

    private persistVpcCidr() {
        new VcisSsmStringParameterConstruct(this.scope, 'vpcCidrListSsmParam', {
            description: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).vpcCidrList,
            name: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).vpcCidrList,
            stringValue: InputParameterHolder.get(VpcParamConfigConstruct.VPC_INPUT_PARAMS_HOLDER).vpcCidrList
        });
    }

    private persistPrimaryCentralBastionIP() {
        new VcisSsmStringParameterConstruct(this.scope, 'primaryCentralBastionIpSsmParam', {
            description: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).primaryCentralBastionIP,
            name:InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).primaryCentralBastionIP,
            stringValue: InputParameterHolder.get(VpcParamConfigConstruct.VPC_INPUT_PARAMS_HOLDER).primaryCentralBastionIP
        });
    }

    private persistSecondaryCentralBastionIP() {
        new VcisSsmStringParameterConstruct(this.scope, 'secondaryCentralBastionIpSsmParam', {
            description: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).secondaryCentralBastionIP,
            name: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).secondaryCentralBastionIP,
            stringValue: InputParameterHolder.get(VpcParamConfigConstruct.VPC_INPUT_PARAMS_HOLDER).secondaryCentralBastionIP
        });
    }

    private persistBastionHostKeyName() {
        new VcisSsmStringParameterConstruct(this.scope, 'bastionHostKeyNameSsmParam', {
            description: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).bastionHostKeyName,
            name: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).bastionHostKeyName,
            stringValue: InputParameterHolder.get(VpcParamConfigConstruct.VPC_INPUT_PARAMS_HOLDER).bastionHostKeyName
        });
    }

    private persistBastionInstanceType() {
        new VcisSsmStringParameterConstruct(this.scope, 'bastionInstanceTypeSsmParam', {
            description: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).bastionInstanceType,
            name: InputParameterHolder.get(VpcParamConfigConstruct.VPC_SSM_PARAMS_PATH_HOLDER).bastionInstanceType,
            stringValue: InputParameterHolder.get(VpcParamConfigConstruct.VPC_INPUT_PARAMS_HOLDER).bastionInstanceType
        });
    }


}