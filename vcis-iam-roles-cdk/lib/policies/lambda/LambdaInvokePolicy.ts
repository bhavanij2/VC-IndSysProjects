import {Stack} from "@aws-cdk/cdk";
import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {Statement} from "../../model/Statement";
import {InlinePolicies} from "../InlinePolicies";

export class LambdaInvokePolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.LAMBDA_INVOKE,
                new Statement(PolicyStatementEffect.Allow,
                    ['lambda:InvokeFunction'],
                    ['arn:aws:lambda:us-east-1:*:function:vcis*'],
                    []));
        }
        return this.policy;
    }
}
