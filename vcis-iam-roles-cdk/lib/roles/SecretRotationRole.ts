import {Stack} from "@aws-cdk/cdk";
import {Role, ServicePrincipal} from "@aws-cdk/aws-iam";
import {Resources} from "../model/Resources";
import {SecretsManagerRotateSecretPolicy} from "../policies/secret-manager/SecretsManagerRotateSecretPolicy";
import {ManagedPolicies} from "../policies/ManagedPolicies";
import {ServicePrincipals} from "./ServicePrincipals";
import {NamingConvention} from "@monsantoit/vcis-cdk-utils";

export class SecretRotationRole {


    static create(stack: Stack): Role {
        const role = new Role(stack, Resources.SECRET_ROTATION_ROLE,
            {
                assumedBy: new ServicePrincipal(ServicePrincipals.LAMBDA),
                roleName: NamingConvention.apply(Resources.SECRET_ROTATION_ROLE)
            }
        );

        role.attachManagedPolicy(ManagedPolicies.LAMBDA_VPC_EXECUTION);

        role.attachInlinePolicy(SecretsManagerRotateSecretPolicy.get(stack));

        return role;
    }
}
