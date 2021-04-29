import { Stack } from "@aws-cdk/cdk";
import { Role } from "@aws-cdk/aws-iam";
export declare class ApiGatewayRole {
    static create(stack: Stack): Role;
}
