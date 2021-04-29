import cdk = require("@aws-cdk/cdk");

let env: string;

export class EnvironmentHolder {

    static setup(node: cdk.ConstructNode) {
        if(env === undefined) {
            if (node.getContext('env') === undefined) {
                throw new Error('Environment argument is required. Valid values can be [non-prod | prod] OR [dev | it | prod]');
            }
            env = node.getContext('env');
        }
    }

    static getEnv = () => {
        return env;
    }
}
