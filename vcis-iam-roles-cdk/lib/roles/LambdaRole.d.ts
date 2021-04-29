import cdk = require('@aws-cdk/cdk');
import { Role } from "@aws-cdk/aws-iam";
export declare class LambdaRole {
    static create(stack: cdk.Stack): Role;
}
