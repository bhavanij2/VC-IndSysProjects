import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {Statement} from "../../model/Statement";
import {InlinePolicies} from "../InlinePolicies";

export class RDSAccessPolicy {
    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack,
                InlinePolicies.RDS_ACCESS,
                new Statement(PolicyStatementEffect.Allow, ['rds:*'], ['*'], []),
                new Statement(PolicyStatementEffect.Deny,
                    ['rds:AuthorizeDBSecurityGroupIngress',
                        'rds:CreateDBCluster',
                        'rds:CreateDBInstance',
                        'rds:CreateDBSecurityGroup',
                        'rds:CreateDBSubnetGroup',
                        'rds:DeleteDBCluster',
                        'rds:DeleteDBInstance',
                        'rds:DeleteDBSecurityGroup',
                        'rds:DeleteDBSubnetGroup',
                        'rds:ModifyDBSubnetGroup',
                        'rds:RevokeDBSecurityGroupIngress'
                    ],
                    ['*'],
                    []));
        }
        return this.policy;
    }
}
