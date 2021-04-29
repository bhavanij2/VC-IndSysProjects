"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LambdaRole_1 = require("./roles/LambdaRole");
const ApiGatewayRole_1 = require("./roles/ApiGatewayRole");
const DeveloperReadOnlyRole_1 = require("./roles/DeveloperReadOnlyRole");
const SecretRotationRole_1 = require("./roles/SecretRotationRole");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
class VcisIamRolesCdkStack extends vcis_cdk_utils_1.VcisStack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const lambdaRole = LambdaRole_1.LambdaRole.create(this);
        const apiGWRole = ApiGatewayRole_1.ApiGatewayRole.create(this);
        const developerRole = DeveloperReadOnlyRole_1.DeveloperReadOnlyRole.create(this);
        const secretRotationRole = SecretRotationRole_1.SecretRotationRole.create(this);
        this.output = {
            lambdaRole: lambdaRole,
            apiGWRole: apiGWRole,
            developerRole: developerRole,
            secretRotationRole: secretRotationRole
        };
    }
}
exports.VcisIamRolesCdkStack = VcisIamRolesCdkStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmNpcy1pYW0tcm9sZXMtY2RrLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidmNpcy1pYW0tcm9sZXMtY2RrLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsbURBQThDO0FBQzlDLDJEQUFzRDtBQUN0RCx5RUFBb0U7QUFDcEUsbUVBQThEO0FBRTlELCtEQUE4RDtBQVM5RCxNQUFhLG9CQUFxQixTQUFRLDBCQUFrRDtJQUV4RixZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsTUFBTSxVQUFVLEdBQUcsdUJBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsTUFBTSxTQUFTLEdBQUcsK0JBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDOUMsTUFBTSxhQUFhLEdBQUcsNkNBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pELE1BQU0sa0JBQWtCLEdBQUcsdUNBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTNELElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDVixVQUFVLEVBQUUsVUFBVTtZQUN0QixTQUFTLEVBQUUsU0FBUztZQUNwQixhQUFhLEVBQUUsYUFBYTtZQUM1QixrQkFBa0IsRUFBRSxrQkFBa0I7U0FDekMsQ0FBQTtJQUNMLENBQUM7Q0FDSjtBQWpCRCxvREFpQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY2RrJyk7XG5pbXBvcnQge0xhbWJkYVJvbGV9IGZyb20gXCIuL3JvbGVzL0xhbWJkYVJvbGVcIjtcbmltcG9ydCB7QXBpR2F0ZXdheVJvbGV9IGZyb20gXCIuL3JvbGVzL0FwaUdhdGV3YXlSb2xlXCI7XG5pbXBvcnQge0RldmVsb3BlclJlYWRPbmx5Um9sZX0gZnJvbSBcIi4vcm9sZXMvRGV2ZWxvcGVyUmVhZE9ubHlSb2xlXCI7XG5pbXBvcnQge1NlY3JldFJvdGF0aW9uUm9sZX0gZnJvbSBcIi4vcm9sZXMvU2VjcmV0Um90YXRpb25Sb2xlXCI7XG5pbXBvcnQge1JvbGV9IGZyb20gXCJAYXdzLWNkay9hd3MtaWFtXCI7XG5pbXBvcnQge1ZjaXNTdGFjaywgVmNpc0FwcH0gZnJvbSBcIkBtb25zYW50b2l0L3ZjaXMtY2RrLXV0aWxzXCI7XG5cbmludGVyZmFjZSBWY2lzSWFtUm9sZXNTdGFja091dHB1dCB7XG4gICAgbGFtYmRhUm9sZTogUm9sZSxcbiAgICBhcGlHV1JvbGU6IFJvbGUsXG4gICAgZGV2ZWxvcGVyUm9sZTogUm9sZSxcbiAgICBzZWNyZXRSb3RhdGlvblJvbGU6IFJvbGVcbn1cblxuZXhwb3J0IGNsYXNzIFZjaXNJYW1Sb2xlc0Nka1N0YWNrIGV4dGVuZHMgVmNpc1N0YWNrPGNkay5TdGFja1Byb3BzLCBWY2lzSWFtUm9sZXNTdGFja091dHB1dD4ge1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IFZjaXNBcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAgICAgY29uc3QgbGFtYmRhUm9sZSA9IExhbWJkYVJvbGUuY3JlYXRlKHRoaXMpO1xuICAgICAgICBjb25zdCBhcGlHV1JvbGUgPSBBcGlHYXRld2F5Um9sZS5jcmVhdGUodGhpcyk7XG4gICAgICAgIGNvbnN0IGRldmVsb3BlclJvbGUgPSBEZXZlbG9wZXJSZWFkT25seVJvbGUuY3JlYXRlKHRoaXMpO1xuICAgICAgICBjb25zdCBzZWNyZXRSb3RhdGlvblJvbGUgPSBTZWNyZXRSb3RhdGlvblJvbGUuY3JlYXRlKHRoaXMpO1xuXG4gICAgICAgIHRoaXMub3V0cHV0ID0ge1xuICAgICAgICAgICAgbGFtYmRhUm9sZTogbGFtYmRhUm9sZSxcbiAgICAgICAgICAgIGFwaUdXUm9sZTogYXBpR1dSb2xlLFxuICAgICAgICAgICAgZGV2ZWxvcGVyUm9sZTogZGV2ZWxvcGVyUm9sZSxcbiAgICAgICAgICAgIHNlY3JldFJvdGF0aW9uUm9sZTogc2VjcmV0Um90YXRpb25Sb2xlXG4gICAgICAgIH1cbiAgICB9XG59XG4iXX0=