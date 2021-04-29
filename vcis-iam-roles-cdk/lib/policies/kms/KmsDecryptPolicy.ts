import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class KmsDecryptPolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.KMS_DECRYPT,
                new Statement(PolicyStatementEffect.Allow,
                    ["kms:Decrypt"],
                    ['arn:aws:kms:us-east-1:*:key/vcis*'],
                    []));
        }
        return this.policy;
    }
}
