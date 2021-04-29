"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const PolicyUtils_1 = require("../../utils/PolicyUtils");
const Resources_1 = require("../../model/Resources");
const Statement_1 = require("../../model/Statement");
class SecretsManagerRotateSecretPolicy {
    static get(stack) {
        if (!this.policy) {
            this.policy = PolicyUtils_1.PolicyUtils.createPolicy(stack, Resources_1.Resources.inlinePolicies.SECRETS_MANAGER_ROTATE_SECRET, new Statement_1.Statement(aws_iam_1.PolicyStatementEffect.Allow, ['secretsmanager:GetRandomPassword',
                'secretsmanager:GetSecretValue',
                'secretsmanager:DescribeSecret',
                'secretsmanager:PutSecretValue',
                'secretsmanager:UpdateSecretVersionStage'], ['arn:aws:secretsmanager:us-east1:*:secret:vcis*'], []));
        }
        return this.policy;
    }
}
exports.SecretsManagerRotateSecretPolicy = SecretsManagerRotateSecretPolicy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjcmV0c01hbmFnZXJSb3RhdGVTZWNyZXRQb2xpY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZWNyZXRzTWFuYWdlclJvdGF0ZVNlY3JldFBvbGljeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhDQUErRDtBQUMvRCx5REFBb0Q7QUFDcEQscURBQWdEO0FBQ2hELHFEQUFnRDtBQUVoRCxNQUFhLGdDQUFnQztJQUlsQyxNQUFNLENBQUMsR0FBRyxDQUFDLEtBQVk7UUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZCxJQUFJLENBQUMsTUFBTSxHQUFHLHlCQUFXLENBQUMsWUFBWSxDQUFDLEtBQUssRUFBRSxxQkFBUyxDQUFDLGNBQWMsQ0FBQyw2QkFBNkIsRUFDaEcsSUFBSSxxQkFBUyxDQUFDLCtCQUFxQixDQUFDLEtBQUssRUFBRSxDQUFDLGtDQUFrQztnQkFDdEUsK0JBQStCO2dCQUMvQiwrQkFBK0I7Z0JBQy9CLCtCQUErQjtnQkFDL0IseUNBQXlDLENBQUMsRUFDOUMsQ0FBQyxnREFBZ0QsQ0FBQyxFQUNsRCxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3ZCLENBQUM7Q0FFSjtBQWxCRCw0RUFrQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0YWNrfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQge1BvbGljeSwgUG9saWN5U3RhdGVtZW50RWZmZWN0fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0IHtQb2xpY3lVdGlsc30gZnJvbSBcIi4uLy4uL3V0aWxzL1BvbGljeVV0aWxzXCI7XG5pbXBvcnQge1Jlc291cmNlc30gZnJvbSBcIi4uLy4uL21vZGVsL1Jlc291cmNlc1wiO1xuaW1wb3J0IHtTdGF0ZW1lbnR9IGZyb20gXCIuLi8uLi9tb2RlbC9TdGF0ZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIFNlY3JldHNNYW5hZ2VyUm90YXRlU2VjcmV0UG9saWN5IHtcblxuICAgIHByaXZhdGUgc3RhdGljIHBvbGljeTogUG9saWN5O1xuXG4gICAgcHVibGljIHN0YXRpYyBnZXQoc3RhY2s6IFN0YWNrKTogUG9saWN5IHtcbiAgICAgICAgaWYgKCF0aGlzLnBvbGljeSkge1xuICAgICAgICAgICAgdGhpcy5wb2xpY3kgPSBQb2xpY3lVdGlscy5jcmVhdGVQb2xpY3koc3RhY2ssIFJlc291cmNlcy5pbmxpbmVQb2xpY2llcy5TRUNSRVRTX01BTkFHRVJfUk9UQVRFX1NFQ1JFVCxcbiAgICAgICAgICAgICAgICBuZXcgU3RhdGVtZW50KFBvbGljeVN0YXRlbWVudEVmZmVjdC5BbGxvdywgWydzZWNyZXRzbWFuYWdlcjpHZXRSYW5kb21QYXNzd29yZCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VjcmV0c21hbmFnZXI6R2V0U2VjcmV0VmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3JldHNtYW5hZ2VyOkRlc2NyaWJlU2VjcmV0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdzZWNyZXRzbWFuYWdlcjpQdXRTZWNyZXRWYWx1ZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2VjcmV0c21hbmFnZXI6VXBkYXRlU2VjcmV0VmVyc2lvblN0YWdlJ10sXG4gICAgICAgICAgICAgICAgICAgIFsnYXJuOmF3czpzZWNyZXRzbWFuYWdlcjp1cy1lYXN0MToqOnNlY3JldDp2Y2lzKiddLFxuICAgICAgICAgICAgICAgICAgICBbXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBvbGljeTtcbiAgICB9XG5cbn1cbiJdfQ==