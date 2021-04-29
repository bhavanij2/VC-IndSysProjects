"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const Resources_1 = require("../model/Resources");
const SecretsManagerRotateSecretPolicy_1 = require("../policies/secret-manager/SecretsManagerRotateSecretPolicy");
const ManagedPolicies_1 = require("../policies/ManagedPolicies");
const ServicePrincipals_1 = require("./ServicePrincipals");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
class SecretRotationRole {
    static create(stack) {
        const role = new aws_iam_1.Role(stack, Resources_1.Resources.SECRET_ROTATION_ROLE, {
            assumedBy: new aws_iam_1.ServicePrincipal(ServicePrincipals_1.ServicePrincipals.LAMBDA),
            roleName: vcis_cdk_utils_1.NamingConvention.apply(Resources_1.Resources.SECRET_ROTATION_ROLE)
        });
        role.attachManagedPolicy(ManagedPolicies_1.ManagedPolicies.LAMBDA_VPC_EXECUTION);
        role.attachInlinePolicy(SecretsManagerRotateSecretPolicy_1.SecretsManagerRotateSecretPolicy.get(stack));
        return role;
    }
}
exports.SecretRotationRole = SecretRotationRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0Um90YXRpb25Sb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VjcmV0Um90YXRpb25Sb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQXdEO0FBQ3hELGtEQUE2QztBQUM3QyxrSEFBNkc7QUFDN0csaUVBQTREO0FBQzVELDJEQUFzRDtBQUN0RCwrREFBNEQ7QUFFNUQsTUFBYSxrQkFBa0I7SUFHM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFZO1FBQ3RCLE1BQU0sSUFBSSxHQUFHLElBQUksY0FBSSxDQUFDLEtBQUssRUFBRSxxQkFBUyxDQUFDLG9CQUFvQixFQUN2RDtZQUNJLFNBQVMsRUFBRSxJQUFJLDBCQUFnQixDQUFDLHFDQUFpQixDQUFDLE1BQU0sQ0FBQztZQUN6RCxRQUFRLEVBQUUsaUNBQWdCLENBQUMsS0FBSyxDQUFDLHFCQUFTLENBQUMsb0JBQW9CLENBQUM7U0FDbkUsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlDQUFlLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUUvRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsbUVBQWdDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFckUsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNKO0FBakJELGdEQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RhY2t9IGZyb20gXCJAYXdzLWNkay9jZGtcIjtcbmltcG9ydCB7Um9sZSwgU2VydmljZVByaW5jaXBhbH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1pYW1cIjtcbmltcG9ydCB7UmVzb3VyY2VzfSBmcm9tIFwiLi4vbW9kZWwvUmVzb3VyY2VzXCI7XG5pbXBvcnQge1NlY3JldHNNYW5hZ2VyUm90YXRlU2VjcmV0UG9saWN5fSBmcm9tIFwiLi4vcG9saWNpZXMvc2VjcmV0LW1hbmFnZXIvU2VjcmV0c01hbmFnZXJSb3RhdGVTZWNyZXRQb2xpY3lcIjtcbmltcG9ydCB7TWFuYWdlZFBvbGljaWVzfSBmcm9tIFwiLi4vcG9saWNpZXMvTWFuYWdlZFBvbGljaWVzXCI7XG5pbXBvcnQge1NlcnZpY2VQcmluY2lwYWxzfSBmcm9tIFwiLi9TZXJ2aWNlUHJpbmNpcGFsc1wiO1xuaW1wb3J0IHtOYW1pbmdDb252ZW50aW9ufSBmcm9tIFwiQG1vbnNhbnRvaXQvdmNpcy1jZGstdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIFNlY3JldFJvdGF0aW9uUm9sZSB7XG5cblxuICAgIHN0YXRpYyBjcmVhdGUoc3RhY2s6IFN0YWNrKTogUm9sZSB7XG4gICAgICAgIGNvbnN0IHJvbGUgPSBuZXcgUm9sZShzdGFjaywgUmVzb3VyY2VzLlNFQ1JFVF9ST1RBVElPTl9ST0xFLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGFzc3VtZWRCeTogbmV3IFNlcnZpY2VQcmluY2lwYWwoU2VydmljZVByaW5jaXBhbHMuTEFNQkRBKSxcbiAgICAgICAgICAgICAgICByb2xlTmFtZTogTmFtaW5nQ29udmVudGlvbi5hcHBseShSZXNvdXJjZXMuU0VDUkVUX1JPVEFUSU9OX1JPTEUpXG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgcm9sZS5hdHRhY2hNYW5hZ2VkUG9saWN5KE1hbmFnZWRQb2xpY2llcy5MQU1CREFfVlBDX0VYRUNVVElPTik7XG5cbiAgICAgICAgcm9sZS5hdHRhY2hJbmxpbmVQb2xpY3koU2VjcmV0c01hbmFnZXJSb3RhdGVTZWNyZXRQb2xpY3kuZ2V0KHN0YWNrKSk7XG5cbiAgICAgICAgcmV0dXJuIHJvbGU7XG4gICAgfVxufVxuIl19