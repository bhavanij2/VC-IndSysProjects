"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const PolicyUtils_1 = require("../../utils/PolicyUtils");
const Statement_1 = require("../../model/Statement");
const InlinePolicies_1 = require("../InlinePolicies");
class RDSAccessPolicy {
    static get(stack) {
        if (!this.policy) {
            this.policy = PolicyUtils_1.PolicyUtils.createPolicy(stack, InlinePolicies_1.InlinePolicies.RDS_ACCESS, new Statement_1.Statement(aws_iam_1.PolicyStatementEffect.Allow, ['rds:*'], ['*'], []), new Statement_1.Statement(aws_iam_1.PolicyStatementEffect.Deny, ['rds:AuthorizeDBSecurityGroupIngress',
                'rds:CreateDBCluster',
                'rds:CreateDBInstance',
                'rds:CreateDBSecurityGroup',
                'rds:CreateDBSubnetGroup',
                'rds:DeleteDBCluster',
                'rds:DeleteDBInstance',
                'rds:DeleteDBSecurityGroup',
                'rds:DeleteDBSubnetGroup',
                'rds:ModifyDBSubnetGroup',
                'rds:RevokeDBSecurityGroupIngress'
            ], ['*'], []));
        }
        return this.policy;
    }
}
exports.RDSAccessPolicy = RDSAccessPolicy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkRTQWNjZXNzUG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUkRTQWNjZXNzUG9saWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStEO0FBRS9ELHlEQUFvRDtBQUNwRCxxREFBZ0Q7QUFDaEQsc0RBQWlEO0FBRWpELE1BQWEsZUFBZTtJQUdqQixNQUFNLENBQUMsR0FBRyxDQUFDLEtBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFDeEMsK0JBQWMsQ0FBQyxVQUFVLEVBQ3pCLElBQUkscUJBQVMsQ0FBQywrQkFBcUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxFQUNoRSxJQUFJLHFCQUFTLENBQUMsK0JBQXFCLENBQUMsSUFBSSxFQUNwQyxDQUFDLHFDQUFxQztnQkFDbEMscUJBQXFCO2dCQUNyQixzQkFBc0I7Z0JBQ3RCLDJCQUEyQjtnQkFDM0IseUJBQXlCO2dCQUN6QixxQkFBcUI7Z0JBQ3JCLHNCQUFzQjtnQkFDdEIsMkJBQTJCO2dCQUMzQix5QkFBeUI7Z0JBQ3pCLHlCQUF5QjtnQkFDekIsa0NBQWtDO2FBQ3JDLEVBQ0QsQ0FBQyxHQUFHLENBQUMsRUFDTCxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FDSjtBQTFCRCwwQ0EwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1BvbGljeSwgUG9saWN5U3RhdGVtZW50RWZmZWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0IHtTdGFja30gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IHtQb2xpY3lVdGlsc30gZnJvbSBcIi4uLy4uL3V0aWxzL1BvbGljeVV0aWxzXCI7XG5pbXBvcnQge1N0YXRlbWVudH0gZnJvbSBcIi4uLy4uL21vZGVsL1N0YXRlbWVudFwiO1xuaW1wb3J0IHtJbmxpbmVQb2xpY2llc30gZnJvbSBcIi4uL0lubGluZVBvbGljaWVzXCI7XG5cbmV4cG9ydCBjbGFzcyBSRFNBY2Nlc3NQb2xpY3kge1xuICAgIHByaXZhdGUgc3RhdGljIHBvbGljeTogUG9saWN5O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQoc3RhY2s6IFN0YWNrKTogUG9saWN5IHtcbiAgICAgICAgaWYgKCF0aGlzLnBvbGljeSkge1xuICAgICAgICAgICAgdGhpcy5wb2xpY3kgPSBQb2xpY3lVdGlscy5jcmVhdGVQb2xpY3koc3RhY2ssXG4gICAgICAgICAgICAgICAgSW5saW5lUG9saWNpZXMuUkRTX0FDQ0VTUyxcbiAgICAgICAgICAgICAgICBuZXcgU3RhdGVtZW50KFBvbGljeVN0YXRlbWVudEVmZmVjdC5BbGxvdywgWydyZHM6KiddLCBbJyonXSwgW10pLFxuICAgICAgICAgICAgICAgIG5ldyBTdGF0ZW1lbnQoUG9saWN5U3RhdGVtZW50RWZmZWN0LkRlbnksXG4gICAgICAgICAgICAgICAgICAgIFsncmRzOkF1dGhvcml6ZURCU2VjdXJpdHlHcm91cEluZ3Jlc3MnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JkczpDcmVhdGVEQkNsdXN0ZXInLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JkczpDcmVhdGVEQkluc3RhbmNlJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZHM6Q3JlYXRlREJTZWN1cml0eUdyb3VwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZHM6Q3JlYXRlREJTdWJuZXRHcm91cCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAncmRzOkRlbGV0ZURCQ2x1c3RlcicsXG4gICAgICAgICAgICAgICAgICAgICAgICAncmRzOkRlbGV0ZURCSW5zdGFuY2UnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JkczpEZWxldGVEQlNlY3VyaXR5R3JvdXAnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3JkczpEZWxldGVEQlN1Ym5ldEdyb3VwJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdyZHM6TW9kaWZ5REJTdWJuZXRHcm91cCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAncmRzOlJldm9rZURCU2VjdXJpdHlHcm91cEluZ3Jlc3MnXG4gICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgIFsnKiddLFxuICAgICAgICAgICAgICAgICAgICBbXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBvbGljeTtcbiAgICB9XG59XG4iXX0=