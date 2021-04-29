"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
class PolicyUtils {
    static createPolicy(stack, policyName, ...statements) {
        const policy = new aws_iam_1.Policy(stack, policyName, { policyName: vcis_cdk_utils_1.NamingConvention.apply(policyName) });
        for (let i = 0; i < statements.length; i++) {
            const policyStatement = this.createStatement(statements[i]);
            policy.addStatement(policyStatement);
        }
        return policy;
    }
    static createStatement(statement) {
        const policyStatement = new aws_iam_1.PolicyStatement(statement.policyStatementEffect);
        policyStatement.addActions(...statement.actions);
        policyStatement.addResources(...statement.resources);
        statement.conditions.forEach(condition => {
            policyStatement.addCondition(condition.key, condition.value);
        });
        return policyStatement;
    }
}
exports.PolicyUtils = PolicyUtils;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9saWN5VXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJQb2xpY3lVdGlscy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDhDQUF5RDtBQUN6RCwrREFBNEQ7QUFFNUQsTUFBYSxXQUFXO0lBRXBCLE1BQU0sQ0FBQyxZQUFZLENBQUMsS0FBZ0IsRUFDVCxVQUFrQixFQUNsQixHQUFHLFVBQXVCO1FBRWpELE1BQU0sTUFBTSxHQUFHLElBQUksZ0JBQU0sQ0FBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLEVBQUMsVUFBVSxFQUFFLGlDQUFnQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBQyxDQUFDLENBQUM7UUFFL0YsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsTUFBTSxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1RCxNQUFNLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVPLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBb0I7UUFDL0MsTUFBTSxlQUFlLEdBQUcsSUFBSSx5QkFBZSxDQUFDLFNBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQzdFLGVBQWUsQ0FBQyxVQUFVLENBQUMsR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQsZUFBZSxDQUFDLFlBQVksQ0FBQyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVyRCxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtZQUNyQyxlQUFlLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2pFLENBQUMsQ0FBQyxDQUFDO1FBRUgsT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztDQUNKO0FBM0JELGtDQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jZGsnKTtcbmltcG9ydCB7U3RhdGVtZW50fSBmcm9tIFwiLi4vbW9kZWwvU3RhdGVtZW50XCI7XG5pbXBvcnQge1BvbGljeSwgUG9saWN5U3RhdGVtZW50fSBmcm9tIFwiQGF3cy1jZGsvYXdzLWlhbVwiO1xuaW1wb3J0IHtOYW1pbmdDb252ZW50aW9ufSBmcm9tIFwiQG1vbnNhbnRvaXQvdmNpcy1jZGstdXRpbHNcIjtcblxuZXhwb3J0IGNsYXNzIFBvbGljeVV0aWxzIHtcblxuICAgIHN0YXRpYyBjcmVhdGVQb2xpY3koc3RhY2s6IGNkay5TdGFjayxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb2xpY3lOYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGVtZW50czogU3RhdGVtZW50W10pOiBQb2xpY3kge1xuXG4gICAgICAgIGNvbnN0IHBvbGljeSA9IG5ldyBQb2xpY3koc3RhY2ssIHBvbGljeU5hbWUsIHtwb2xpY3lOYW1lOiBOYW1pbmdDb252ZW50aW9uLmFwcGx5KHBvbGljeU5hbWUpfSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb25zdCBwb2xpY3lTdGF0ZW1lbnQgPSB0aGlzLmNyZWF0ZVN0YXRlbWVudChzdGF0ZW1lbnRzW2ldKTtcbiAgICAgICAgICAgIHBvbGljeS5hZGRTdGF0ZW1lbnQocG9saWN5U3RhdGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBwb2xpY3k7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzdGF0aWMgY3JlYXRlU3RhdGVtZW50KHN0YXRlbWVudDogU3RhdGVtZW50KSB7XG4gICAgICAgIGNvbnN0IHBvbGljeVN0YXRlbWVudCA9IG5ldyBQb2xpY3lTdGF0ZW1lbnQoc3RhdGVtZW50LnBvbGljeVN0YXRlbWVudEVmZmVjdCk7XG4gICAgICAgIHBvbGljeVN0YXRlbWVudC5hZGRBY3Rpb25zKC4uLnN0YXRlbWVudC5hY3Rpb25zKTtcbiAgICAgICAgcG9saWN5U3RhdGVtZW50LmFkZFJlc291cmNlcyguLi5zdGF0ZW1lbnQucmVzb3VyY2VzKTtcblxuICAgICAgICBzdGF0ZW1lbnQuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgICAgICBwb2xpY3lTdGF0ZW1lbnQuYWRkQ29uZGl0aW9uKGNvbmRpdGlvbi5rZXksIGNvbmRpdGlvbi52YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwb2xpY3lTdGF0ZW1lbnQ7XG4gICAgfVxufVxuIl19