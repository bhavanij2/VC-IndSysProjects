import {Statement} from "../../model/Statement";
import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";

export class SqsProduceMessagePolicy {
    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.SQS_PRODUCE_MESSAGE,
                new Statement(PolicyStatementEffect.Allow,
                    ['sqs:SendMessage', 'sqs:SendMessageBatch'],
                    ['arn:aws:sqs:us-east-1:*:vcis*'],
                    []));
        }
        return this.policy;
    }
}
