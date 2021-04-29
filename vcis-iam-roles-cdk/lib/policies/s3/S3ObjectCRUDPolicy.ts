import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Stack} from "@aws-cdk/cdk";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Statement} from "../../model/Statement";

export class S3ObjectCRUDPolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.S3_OBJECT_CRUD_POLICY,
                new Statement(PolicyStatementEffect.Allow,
                    ['s3:AbortMultipartUpload',
                        's3:DeleteObject',
                        's3:DeleteObjectVersion',
                        's3:GetObject',
                        's3:GetObjectAcl',
                        's3:GetObjectVersion',
                        's3:GetObjectVersionAcl',
                        's3:PutObject',
                        's3:PutObjectAcl',
                        's3:PutObjectAclVersion'],
                    ['arn:aws:s3:::vcis*'],
                    []))
        }
        return this.policy;
    }
}

