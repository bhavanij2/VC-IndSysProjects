import cdk = require('@aws-cdk/cdk');
import { Statement } from "../model/Statement";
import { Policy } from "@aws-cdk/aws-iam";
export declare class PolicyUtils {
    static createPolicy(stack: cdk.Stack, policyName: string, ...statements: Statement[]): Policy;
    private static createStatement;
}
