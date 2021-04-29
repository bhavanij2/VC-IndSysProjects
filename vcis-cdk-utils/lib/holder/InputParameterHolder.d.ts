import cdk = require("@aws-cdk/cdk");
export declare class InputParameterHolder {
    static setup(node: cdk.ConstructNode, loadTags?: boolean): Promise<any>;
    static unflatten(data: any): any;
    private static loadParametersFromPath;
    private static populateParameters;
    static fetchParameterValuePromise(parameterValue: string, path: string): Promise<{}> | Promise<void | {
        paramName: string;
        value: string | string[] | undefined;
    }>;
    static fetchConstantValueAsync(paramValue: string, path: string): Promise<{}>;
    static fetchParameterFromSSMAsync(paramValue: string, version: any, path: string): Promise<void | {
        paramName: string;
        value: string | string[] | undefined;
    }>;
    static get: (paramName: string) => any;
}
export interface flatParam {
    paramName: string;
    value: string;
}
