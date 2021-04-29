import {Stack} from "@aws-cdk/cdk";
import {Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {Resources} from "../model/Resources";
import {LambdaInvokePolicy} from "../policies/lambda/LambdaInvokePolicy";
import {KinesisProduceMessagePolicy} from "../policies/kinesis/KinesisProduceMessagePolicy";
import {CloudWatchBasicLoggingPolicy} from "../policies/cloud-watch/CloudWatchBasicLoggingPolicy";
import {SqsProduceMessagePolicy} from "../policies/sqs/SqsProduceMessagePolicy";
import {ServicePrincipals} from "./ServicePrincipals";
import {NamingConvention} from "@monsantoit/vcis-cdk-utils";

export class ApiGatewayRole {
    static create(stack: Stack): Role {
        const role = new Role(stack, Resources.API_GW_ROLE, {
            assumedBy: new ServicePrincipal(ServicePrincipals.API_GW),
            roleName: NamingConvention.apply(Resources.API_GW_ROLE)
        });

        role.attachInlinePolicy(LambdaInvokePolicy.get(stack));
        role.attachInlinePolicy(KinesisProduceMessagePolicy.get(stack));
        role.attachInlinePolicy(CloudWatchBasicLoggingPolicy.get(stack));
        role.attachInlinePolicy(SqsProduceMessagePolicy.get(stack));

        return role;
    }
}

