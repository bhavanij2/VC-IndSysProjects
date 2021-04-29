import {PolicyUtils} from "../../utils/PolicyUtils";
import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Statement} from "../../model/Statement";
import {InlinePolicies} from "../InlinePolicies";
import {Stack} from "@aws-cdk/cdk";

export class CloudWatchBasicLoggingPolicy {

    private static policy: Policy;

    static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack,
                InlinePolicies.CLOUDWATCH_LOGS,
                new Statement(PolicyStatementEffect.Allow,
                    ['logs:CreateLogGroup',
                        'logs:CreateLogStream',
                        'logs:PutLogEvents',
                        'logs:PutRetentionPolicy',
                        'logs:DescribeLogStreams'],
                    ['arn:aws:logs:us-east-1:*:vcis*'],
                    []));
        }
        return this.policy;
    }
}

