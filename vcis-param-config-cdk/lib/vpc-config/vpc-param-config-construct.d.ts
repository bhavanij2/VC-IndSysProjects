import cdk = require('@aws-cdk/cdk');
import { Construct } from '@aws-cdk/cdk';
export declare class VpcParamConfigConstruct extends cdk.Construct {
    private readonly scope;
    private static VPC_SSM_PARAMS_PATH_HOLDER;
    private static VPC_INPUT_PARAMS_HOLDER;
    constructor(scope: Construct, id: string);
    private persistVpcCidr;
    private persistPrimaryCentralBastionIP;
    private persistSecondaryCentralBastionIP;
    private persistBastionHostKeyName;
    private persistBastionInstanceType;
}
