import cdk = require('@aws-cdk/cdk');
import { VcisApp } from "..";
export declare class VcisStack<I extends cdk.StackProps, O> extends cdk.Stack {
    protected output: O;
    constructor(scope: VcisApp, id: string, props?: I);
    getOutput(): O;
}
