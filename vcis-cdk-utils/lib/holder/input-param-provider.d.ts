import { ParameterStoreStringProps } from '@aws-cdk/aws-ssm';
import { Construct } from '@aws-cdk/cdk';
import cdk = require('@aws-cdk/cdk');
export declare enum ParameterType {
    STRING_PARAM_TYPE = "String",
    STRINGLIST_PARAM_TYPE = "StringList"
}
export declare class VcisInputParameterProvider {
    static fetchStringListParameters2(construct: Construct, paramName: string, version: number): void;
    static fetchStringListParameters(construct: Construct, paramName: string, version: number, type: ParameterType): void;
}
export declare class ParameterStoreString extends cdk.Construct {
    readonly stringValue: string;
    constructor(scope: cdk.Construct, id: string, props: ParameterStoreStringProps);
}
export declare class ParameterStoreStringList extends cdk.Construct {
    readonly stringValue: string;
    readonly param: cdk.CfnParameter;
    constructor(scope: cdk.Construct, id: string, props: ParameterStoreStringProps);
}
