import { Stack } from "@aws-cdk/cdk";
import { Policy } from "@aws-cdk/aws-iam";
export declare class SecretsManagerRotateSecretPolicy {
    private static policy;
    static get(stack: Stack): Policy;
}
