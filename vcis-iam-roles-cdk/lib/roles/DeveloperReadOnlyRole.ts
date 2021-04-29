import {Stack} from "@aws-cdk/cdk";
import {FederatedPrincipal, Role} from "@aws-cdk/aws-iam";
import {Resources} from "../model/Resources";
import {ManagedPolicies} from "../policies/ManagedPolicies";
import {NamingConvention} from "@monsantoit/vcis-cdk-utils";

export class DeveloperReadOnlyRole {

    static create(stack: Stack): Role {
        const role = new Role(stack, Resources.DEVELOPER_READ_ONLY_ROLE,
            {
                assumedBy: new FederatedPrincipal(`arn:aws:iam::${stack.accountId}:saml-provider/PingOne`,
                    {},
                    'sts:AssumeRoleWithSAML'),
                roleName: NamingConvention.apply(Resources.DEVELOPER_READ_ONLY_ROLE)
            });

        role.attachManagedPolicy(ManagedPolicies.READ_ONLY_ACCESS);

        return role;
    }
}
