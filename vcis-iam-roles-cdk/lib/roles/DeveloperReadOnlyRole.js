"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const Resources_1 = require("../model/Resources");
const ManagedPolicies_1 = require("../policies/ManagedPolicies");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
class DeveloperReadOnlyRole {
    static create(stack) {
        const role = new aws_iam_1.Role(stack, Resources_1.Resources.DEVELOPER_READ_ONLY_ROLE, {
            assumedBy: new aws_iam_1.FederatedPrincipal(`arn:aws:iam::${stack.accountId}:saml-provider/PingOne`, {}, 'sts:AssumeRoleWithSAML'),
            roleName: vcis_cdk_utils_1.NamingConvention.apply(Resources_1.Resources.DEVELOPER_READ_ONLY_ROLE)
        });
        role.attachManagedPolicy(ManagedPolicies_1.ManagedPolicies.READ_ONLY_ACCESS);
        return role;
    }
}
exports.DeveloperReadOnlyRole = DeveloperReadOnlyRole;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGV2ZWxvcGVyUmVhZE9ubHlSb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiRGV2ZWxvcGVyUmVhZE9ubHlSb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsOENBQTBEO0FBQzFELGtEQUE2QztBQUM3QyxpRUFBNEQ7QUFDNUQsK0RBQTREO0FBRTVELE1BQWEscUJBQXFCO0lBRTlCLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBWTtRQUN0QixNQUFNLElBQUksR0FBRyxJQUFJLGNBQUksQ0FBQyxLQUFLLEVBQUUscUJBQVMsQ0FBQyx3QkFBd0IsRUFDM0Q7WUFDSSxTQUFTLEVBQUUsSUFBSSw0QkFBa0IsQ0FBQyxnQkFBZ0IsS0FBSyxDQUFDLFNBQVMsd0JBQXdCLEVBQ3JGLEVBQUUsRUFDRix3QkFBd0IsQ0FBQztZQUM3QixRQUFRLEVBQUUsaUNBQWdCLENBQUMsS0FBSyxDQUFDLHFCQUFTLENBQUMsd0JBQXdCLENBQUM7U0FDdkUsQ0FBQyxDQUFDO1FBRVAsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGlDQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUUzRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0NBQ0o7QUFmRCxzREFlQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7U3RhY2t9IGZyb20gXCJAYXdzLWNkay9jZGtcIjtcbmltcG9ydCB7RmVkZXJhdGVkUHJpbmNpcGFsLCBSb2xlfSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0IHtSZXNvdXJjZXN9IGZyb20gXCIuLi9tb2RlbC9SZXNvdXJjZXNcIjtcbmltcG9ydCB7TWFuYWdlZFBvbGljaWVzfSBmcm9tIFwiLi4vcG9saWNpZXMvTWFuYWdlZFBvbGljaWVzXCI7XG5pbXBvcnQge05hbWluZ0NvbnZlbnRpb259IGZyb20gXCJAbW9uc2FudG9pdC92Y2lzLWNkay11dGlsc1wiO1xuXG5leHBvcnQgY2xhc3MgRGV2ZWxvcGVyUmVhZE9ubHlSb2xlIHtcblxuICAgIHN0YXRpYyBjcmVhdGUoc3RhY2s6IFN0YWNrKTogUm9sZSB7XG4gICAgICAgIGNvbnN0IHJvbGUgPSBuZXcgUm9sZShzdGFjaywgUmVzb3VyY2VzLkRFVkVMT1BFUl9SRUFEX09OTFlfUk9MRSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBhc3N1bWVkQnk6IG5ldyBGZWRlcmF0ZWRQcmluY2lwYWwoYGFybjphd3M6aWFtOjoke3N0YWNrLmFjY291bnRJZH06c2FtbC1wcm92aWRlci9QaW5nT25lYCxcbiAgICAgICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAgICAgICdzdHM6QXNzdW1lUm9sZVdpdGhTQU1MJyksXG4gICAgICAgICAgICAgICAgcm9sZU5hbWU6IE5hbWluZ0NvbnZlbnRpb24uYXBwbHkoUmVzb3VyY2VzLkRFVkVMT1BFUl9SRUFEX09OTFlfUk9MRSlcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgIHJvbGUuYXR0YWNoTWFuYWdlZFBvbGljeShNYW5hZ2VkUG9saWNpZXMuUkVBRF9PTkxZX0FDQ0VTUyk7XG5cbiAgICAgICAgcmV0dXJuIHJvbGU7XG4gICAgfVxufVxuIl19