import cdk = require('@aws-cdk/cdk');
import {Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {CloudWatchBasicLoggingPolicy} from "../policies/cloud-watch/CloudWatchBasicLoggingPolicy";
import {Resources} from "../model/Resources";
import {LambdaInvokePolicy} from "../policies/lambda/LambdaInvokePolicy";
import {SqsReceiveMessagePolicy} from "../policies/sqs/SqsReceiveMessagePolicy";
import {SqsProduceMessagePolicy} from "../policies/sqs/SqsProduceMessagePolicy";
import {KinesisProduceMessagePolicy} from "../policies/kinesis/KinesisProduceMessagePolicy";
import {KinesisReceiveMessagePolicy} from "../policies/kinesis/KinesisReceiveMessagePolicy";
import {SnsPublishPolicy} from "../policies/sns/SnsPublishPolicy";
import {S3ObjectCRUDPolicy} from "../policies/s3/S3ObjectCRUDPolicy";
import {KmsDecryptPolicy} from "../policies/kms/KmsDecryptPolicy";
import {SecretsManagerReadValuePolicy} from "../policies/secret-manager/SecretsManagerReadValuePolicy";
import {ManagedPolicies} from "../policies/ManagedPolicies";
import {ServicePrincipals} from "./ServicePrincipals";
import {NamingConvention} from "@monsantoit/vcis-cdk-utils";


export class LambdaRole {

    static create(stack: cdk.Stack): Role {

        const lambdaRole = new Role(stack, Resources.LAMBDA_ROLE, {
            assumedBy: new ServicePrincipal(ServicePrincipals.LAMBDA),
            roleName: NamingConvention.apply(Resources.LAMBDA_ROLE)
        });

        lambdaRole.attachManagedPolicy(ManagedPolicies.XRAY_WRITE_ONLY_ACCESS);
        lambdaRole.attachManagedPolicy(ManagedPolicies.APIGW_INVOKE_FULL_ACCESS);
        lambdaRole.attachManagedPolicy(ManagedPolicies.LAMBDA_VPC_EXECUTION);

        lambdaRole.attachInlinePolicy(CloudWatchBasicLoggingPolicy.get(stack));
        lambdaRole.attachInlinePolicy(LambdaInvokePolicy.get(stack));
        lambdaRole.attachInlinePolicy(SqsReceiveMessagePolicy.get(stack));
        lambdaRole.attachInlinePolicy(SqsProduceMessagePolicy.get(stack));
        lambdaRole.attachInlinePolicy(KinesisProduceMessagePolicy.get(stack));
        lambdaRole.attachInlinePolicy(KinesisReceiveMessagePolicy.get(stack));
        lambdaRole.attachInlinePolicy(SnsPublishPolicy.get(stack));
        lambdaRole.attachInlinePolicy(S3ObjectCRUDPolicy.get(stack));
        lambdaRole.attachInlinePolicy(KmsDecryptPolicy.get(stack));
        lambdaRole.attachInlinePolicy(SecretsManagerReadValuePolicy.get(stack));

        return lambdaRole;
    }
}
