import { Policy } from "@aws-cdk/aws-iam";
import { Stack } from "@aws-cdk/cdk";
export declare class ServiceCatalogEndUserFullAccessPolicy {
    private static policy;
    static get(stack: Stack): Policy;
    private static getServiceCatalogStatement;
    private static getCloudFormationStatement;
}
