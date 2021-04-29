import cdk = require('@aws-cdk/cdk');
import { CfnCustomResource } from '@aws-cdk/aws-cloudformation/lib/cloudformation.generated';
/**
 * Properties to provide a Lambda-backed Ami Lookup custom resource
 */
export interface AmiLookupCustomResourceProps {
    serviceToken: string;
    amiNamePrefix: string;
    region: string;
}
export declare class AmiLookupCustomResource extends CfnCustomResource {
    private readonly userProperties?;
    constructor(scope: cdk.Construct, id: string, props: AmiLookupCustomResourceProps);
    /**
     * Override renderProperties to mix in the user-defined properties
     */
    protected renderProperties(properties: any): {
        [key: string]: any;
    };
}
