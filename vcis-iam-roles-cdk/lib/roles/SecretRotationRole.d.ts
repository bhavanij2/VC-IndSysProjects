import { Stack } from "@aws-cdk/cdk";
import { Role } from "@aws-cdk/aws-iam";
export declare class SecretRotationRole {
    static create(stack: Stack): Role;
}
