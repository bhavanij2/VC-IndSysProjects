import cdk = require("@aws-cdk/cdk");
export declare class EnvironmentHolder {
    static setup(node: cdk.ConstructNode): void;
    static getEnv: () => string;
}
