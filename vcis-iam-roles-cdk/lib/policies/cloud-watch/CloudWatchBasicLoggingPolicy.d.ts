import { Policy } from "@aws-cdk/aws-iam";
import { Stack } from "@aws-cdk/cdk";
export declare class CloudWatchBasicLoggingPolicy {
    private static policy;
    static get(stack: Stack): Policy;
}
