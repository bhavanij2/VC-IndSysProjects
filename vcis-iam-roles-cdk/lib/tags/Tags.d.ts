import cdk = require('@aws-cdk/cdk');
export declare class Tags {
    readonly OWNER: cdk.Tag;
    readonly COST_CENTER: cdk.Tag;
    readonly PROJECT: cdk.Tag;
    readonly ENV: cdk.Tag;
    readonly REGULATED: cdk.Tag;
    readonly DATA_CLASSIFICATION: cdk.Tag;
}
