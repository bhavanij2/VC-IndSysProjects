import { Stack } from "@aws-cdk/cdk";
import { Policy } from "@aws-cdk/aws-iam";
export declare class LambdaInvokePolicy {
    private static policy;
    static get(stack: Stack): Policy;
}
