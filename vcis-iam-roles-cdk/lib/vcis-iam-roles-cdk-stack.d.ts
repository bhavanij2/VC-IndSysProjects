import cdk = require('@aws-cdk/cdk');
import { Role } from "@aws-cdk/aws-iam";
import { VcisStack, VcisApp } from "@monsantoit/vcis-cdk-utils";
interface VcisIamRolesStackOutput {
    lambdaRole: Role;
    apiGWRole: Role;
    developerRole: Role;
    secretRotationRole: Role;
}
export declare class VcisIamRolesCdkStack extends VcisStack<cdk.StackProps, VcisIamRolesStackOutput> {
    constructor(scope: VcisApp, id: string, props?: cdk.StackProps);
}
export {};
