import {Stack} from "@aws-cdk/cdk";
import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class SqsReceiveMessagePolicy {
    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.SQS_RECEIVE_MESSAGE,
                new Statement(PolicyStatementEffect.Allow,
                    ['sqs:ReceiveMessage',
                        'sqs:DeleteMessage',
                        'sqs:GetQueueAttributes'],
                    ['arn:aws:sqs:us-east-1:*:vcis*'],
                    []))
        }
        return this.policy;
    }
}
