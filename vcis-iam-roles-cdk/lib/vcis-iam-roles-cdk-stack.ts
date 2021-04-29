import cdk = require('@aws-cdk/cdk');
import {LambdaRole} from "./roles/LambdaRole";
import {ApiGatewayRole} from "./roles/ApiGatewayRole";
import {DeveloperReadOnlyRole} from "./roles/DeveloperReadOnlyRole";
import {SecretRotationRole} from "./roles/SecretRotationRole";
import {Role} from "@aws-cdk/aws-iam";
import {VcisStack, VcisApp} from "@monsantoit/vcis-cdk-utils";

interface VcisIamRolesStackOutput {
    lambdaRole: Role,
    apiGWRole: Role,
    developerRole: Role,
    secretRotationRole: Role
}

export class VcisIamRolesCdkStack extends VcisStack<cdk.StackProps, VcisIamRolesStackOutput> {

    constructor(scope: VcisApp, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const lambdaRole = LambdaRole.create(this);
        const apiGWRole = ApiGatewayRole.create(this);
        const developerRole = DeveloperReadOnlyRole.create(this);
        const secretRotationRole = SecretRotationRole.create(this);

        this.output = {
            lambdaRole: lambdaRole,
            apiGWRole: apiGWRole,
            developerRole: developerRole,
            secretRotationRole: secretRotationRole
        }
    }
}
