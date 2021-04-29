import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class SnsPublishPolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack,
                InlinePolicies.SNS_PUBLISH,
                new Statement(PolicyStatementEffect.Allow,
                    ['sns:Publish'],
                    ['arn:aws:sns:us-east-1:*:vcis*'],
                    []));
        }
        return this.policy;
    }
}
