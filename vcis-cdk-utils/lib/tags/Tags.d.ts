import cdk = require('@aws-cdk/cdk');
export declare class Tags {
    static tagsParameterStorePaths: {
        "owner": string;
        "costCenter": string;
        "project": string;
        "env": string;
        "regulated": string;
        "dataClassification": string;
    };
    static tagKey: string;
    private static owner;
    private static costCenter;
    private static project;
    private static env;
    private static regulated;
    private static dataClassification;
    static setup(): void;
    static readonly OWNER: cdk.Tag;
    static readonly COST_CENTER: cdk.Tag;
    static readonly PROJECT: cdk.Tag;
    static readonly ENV: cdk.Tag;
    static readonly REGULATED: cdk.Tag;
    static readonly DATA_CLASSIFICATION: cdk.Tag;
}
