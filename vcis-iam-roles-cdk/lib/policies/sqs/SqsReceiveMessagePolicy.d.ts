import { Stack } from "@aws-cdk/cdk";
import { Policy } from "@aws-cdk/aws-iam";
export declare class SqsReceiveMessagePolicy {
    private static policy;
    static get(stack: Stack): Policy;
}
