import cdk = require('@aws-cdk/cdk');
import { VcisApp } from '@monsantoit/vcis-cdk-utils';
export declare class VcisParamConfigStack extends cdk.Stack {
    constructor(app: VcisApp, id: string, props?: cdk.StackProps);
    private configureTagParams;
    private configureVpcParams;
}
