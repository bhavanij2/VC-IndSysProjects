import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class KinesisReceiveMessagePolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.KINESIS_RECEIVE_MESSAGE,
                new Statement(PolicyStatementEffect.Allow,
                    ['kinesis:DescribeStream',
                        'kinesis:GetShardIterator',
                        'kinesis:GetRecords',
                        'kinesis:ListStreams'],
                    ['arn:aws:kinesis:us-east-1:*:stream/vcis*'],
                    []))
        }
        return this.policy;
    }
}
