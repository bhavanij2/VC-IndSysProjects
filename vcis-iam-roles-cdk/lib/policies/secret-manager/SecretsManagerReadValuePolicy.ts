import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class SecretsManagerReadValuePolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.SECRET_MANAGER_READ,
                new Statement(PolicyStatementEffect.Allow, ['secretsmanager:GetSecretValue'],
                    ['arn:aws:secretsmanager:us-east1:*:secret:vcis*'],
                    []));
        }
        return this.policy;
    }
}
