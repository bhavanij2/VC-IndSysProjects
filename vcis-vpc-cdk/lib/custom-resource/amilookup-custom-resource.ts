import cdk = require('@aws-cdk/cdk');
import { CfnCustomResource } from '@aws-cdk/aws-cloudformation/lib/cloudformation.generated';


type Properties = { [key: string]: any };

/**
 * Properties to provide a Lambda-backed Ami Lookup custom resource
 */
export interface AmiLookupCustomResourceProps {
    serviceToken: string;
    amiNamePrefix: string;
    region: string;
}

export class AmiLookupCustomResource extends CfnCustomResource {
    private readonly userProperties?: Properties;

    constructor(scope: cdk.Construct, id: string, props: AmiLookupCustomResourceProps) {
        super(scope, id, {
            serviceToken: props.serviceToken
        });

        this.userProperties = {
            AmiNamePrefix: props.amiNamePrefix,
            Region: props.region
        };
    }

    /**
     * Override renderProperties to mix in the user-defined properties
     */
    protected renderProperties(properties: any): { [key: string]: any } {
        const props = super.renderProperties(properties);
        return Object.assign(props, this.userProperties || {});
    }
}