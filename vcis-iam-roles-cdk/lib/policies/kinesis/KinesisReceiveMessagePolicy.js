"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_iam_1 = require("@aws-cdk/aws-iam");
const PolicyUtils_1 = require("../../utils/PolicyUtils");
const InlinePolicies_1 = require("../InlinePolicies");
const Statement_1 = require("../../model/Statement");
class KinesisReceiveMessagePolicy {
    static get(stack) {
        if (!this.policy) {
            this.policy = PolicyUtils_1.PolicyUtils.createPolicy(stack, InlinePolicies_1.InlinePolicies.KINESIS_RECEIVE_MESSAGE, new Statement_1.Statement(aws_iam_1.PolicyStatementEffect.Allow, ['kinesis:DescribeStream',
                'kinesis:GetShardIterator',
                'kinesis:GetRecords',
                'kinesis:ListStreams'], ['arn:aws:kinesis:us-east-1:*:stream/vcis*'], []));
        }
        return this.policy;
    }
}
exports.KinesisReceiveMessagePolicy = KinesisReceiveMessagePolicy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiS2luZXNpc1JlY2VpdmVNZXNzYWdlUG9saWN5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiS2luZXNpc1JlY2VpdmVNZXNzYWdlUG9saWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsOENBQStEO0FBRS9ELHlEQUFvRDtBQUNwRCxzREFBaUQ7QUFDakQscURBQWdEO0FBRWhELE1BQWEsMkJBQTJCO0lBSTdCLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBWTtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNkLElBQUksQ0FBQyxNQUFNLEdBQUcseUJBQVcsQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLCtCQUFjLENBQUMsdUJBQXVCLEVBQ2hGLElBQUkscUJBQVMsQ0FBQywrQkFBcUIsQ0FBQyxLQUFLLEVBQ3JDLENBQUMsd0JBQXdCO2dCQUNyQiwwQkFBMEI7Z0JBQzFCLG9CQUFvQjtnQkFDcEIscUJBQXFCLENBQUMsRUFDMUIsQ0FBQywwQ0FBMEMsQ0FBQyxFQUM1QyxFQUFFLENBQUMsQ0FBQyxDQUFBO1NBQ2Y7UUFDRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBakJELGtFQWlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7UG9saWN5LCBQb2xpY3lTdGF0ZW1lbnRFZmZlY3R9IGZyb20gXCJAYXdzLWNkay9hd3MtaWFtXCI7XG5pbXBvcnQge1N0YWNrfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQge1BvbGljeVV0aWxzfSBmcm9tIFwiLi4vLi4vdXRpbHMvUG9saWN5VXRpbHNcIjtcbmltcG9ydCB7SW5saW5lUG9saWNpZXN9IGZyb20gXCIuLi9JbmxpbmVQb2xpY2llc1wiO1xuaW1wb3J0IHtTdGF0ZW1lbnR9IGZyb20gXCIuLi8uLi9tb2RlbC9TdGF0ZW1lbnRcIjtcblxuZXhwb3J0IGNsYXNzIEtpbmVzaXNSZWNlaXZlTWVzc2FnZVBvbGljeSB7XG5cbiAgICBwcml2YXRlIHN0YXRpYyBwb2xpY3k6IFBvbGljeTtcblxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0KHN0YWNrOiBTdGFjayk6IFBvbGljeSB7XG4gICAgICAgIGlmICghdGhpcy5wb2xpY3kpIHtcbiAgICAgICAgICAgIHRoaXMucG9saWN5ID0gUG9saWN5VXRpbHMuY3JlYXRlUG9saWN5KHN0YWNrLCBJbmxpbmVQb2xpY2llcy5LSU5FU0lTX1JFQ0VJVkVfTUVTU0FHRSxcbiAgICAgICAgICAgICAgICBuZXcgU3RhdGVtZW50KFBvbGljeVN0YXRlbWVudEVmZmVjdC5BbGxvdyxcbiAgICAgICAgICAgICAgICAgICAgWydraW5lc2lzOkRlc2NyaWJlU3RyZWFtJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdraW5lc2lzOkdldFNoYXJkSXRlcmF0b3InLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2tpbmVzaXM6R2V0UmVjb3JkcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAna2luZXNpczpMaXN0U3RyZWFtcyddLFxuICAgICAgICAgICAgICAgICAgICBbJ2Fybjphd3M6a2luZXNpczp1cy1lYXN0LTE6KjpzdHJlYW0vdmNpcyonXSxcbiAgICAgICAgICAgICAgICAgICAgW10pKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnBvbGljeTtcbiAgICB9XG59XG4iXX0=