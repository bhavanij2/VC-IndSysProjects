"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const PolicyUtils_1 = require("../../utils/PolicyUtils");
const InlinePolicies_1 = require("../InlinePolicies");
const Statement_1 = require("../../model/Statement");
class S3ObjectCRUDPolicy {
    static get(stack) {
        if (!this.policy) {
            this.policy = PolicyUtils_1.PolicyUtils.createPolicy(stack, InlinePolicies_1.InlinePolicies.S3_OBJECT_CRUD_POLICY, new Statement_1.Statement(aws_iam_1.PolicyStatementEffect.Allow, ['s3:AbortMultipartUpload',
                's3:DeleteObject',
                's3:DeleteObjectVersion',
                's3:GetObject',
                's3:GetObjectAcl',
                's3:GetObjectVersion',
                's3:GetObjectVersionAcl',
                's3:PutObject',
                's3:PutObjectAcl',
                's3:PutObjectAclVersion'], ['arn:aws:s3:::vcis*'], []));
        }
        return this.policy;
    }
}
exports.S3ObjectCRUDPolicy = S3ObjectCRUDPolicy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUzNPYmplY3RDUlVEUG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUzNPYmplY3RDUlVEUG9saWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStEO0FBRS9ELHlEQUFvRDtBQUNwRCxzREFBaUQ7QUFDakQscURBQWdEO0FBRWhELE1BQWEsa0JBQWtCO0lBSXBCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBWTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcseUJBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLCtCQUFjLENBQUMscUJBQXFCLEVBQzlFLElBQUkscUJBQVMsQ0FBQywrQkFBcUIsQ0FBQyxLQUFLLEVBQ3JDLENBQUMseUJBQXlCO2dCQUN0QixpQkFBaUI7Z0JBQ2pCLHdCQUF3QjtnQkFDeEIsY0FBYztnQkFDZCxpQkFBaUI7Z0JBQ2pCLHFCQUFxQjtnQkFDckIsd0JBQXdCO2dCQUN4QixjQUFjO2dCQUNkLGlCQUFpQjtnQkFDakIsd0JBQXdCLENBQUMsRUFDN0IsQ0FBQyxvQkFBb0IsQ0FBQyxFQUN0QixFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBdkJELGdEQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9saWN5LCBQb2xpY3lTdGF0ZW1lbnRFZmZlY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtaWFtXCI7XG5pbXBvcnQge1N0YWNrfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQge1BvbGljeVV0aWxzfSBmcm9tIFwiLi4vLi4vdXRpbHMvUG9saWN5VXRpbHNcIjtcbmltcG9ydCB7SW5saW5lUG9saWNpZXN9IGZyb20gXCIuLi9JbmxpbmVQb2xpY2llc1wiO1xuaW1wb3J0IHtTdGF0ZW1lbnR9IGZyb20gXCIuLi8uLi9tb2RlbC9TdGF0ZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIFMzT2JqZWN0Q1JVRFBvbGljeSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBwb2xpY3k6IFBvbGljeTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN0YWNrOiBTdGFjayk6IFBvbGljeSB7XG4gICAgICAgIGlmICghdGhpcy5wb2xpY3kpIHtcbiAgICAgICAgICAgIHRoaXMucG9saWN5ID0gUG9saWN5VXRpbHMuY3JlYXRlUG9saWN5KHN0YWNrLCBJbmxpbmVQb2xpY2llcy5TM19PQkpFQ1RfQ1JVRF9QT0xJQ1ksXG4gICAgICAgICAgICAgICAgbmV3IFN0YXRlbWVudChQb2xpY3lTdGF0ZW1lbnRFZmZlY3QuQWxsb3csXG4gICAgICAgICAgICAgICAgICAgIFsnczM6QWJvcnRNdWx0aXBhcnRVcGxvYWQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3MzOkRlbGV0ZU9iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnczM6RGVsZXRlT2JqZWN0VmVyc2lvbicsXG4gICAgICAgICAgICAgICAgICAgICAgICAnczM6R2V0T2JqZWN0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzMzpHZXRPYmplY3RBY2wnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3MzOkdldE9iamVjdFZlcnNpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3MzOkdldE9iamVjdFZlcnNpb25BY2wnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3MzOlB1dE9iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnczM6UHV0T2JqZWN0QWNsJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzMzpQdXRPYmplY3RBY2xWZXJzaW9uJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnYXJuOmF3czpzMzo6OnZjaXMqJ10sXG4gICAgICAgICAgICAgICAgICAgIFtdKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5wb2xpY3k7XG4gICAgfVxufVxuXG4iXX0=