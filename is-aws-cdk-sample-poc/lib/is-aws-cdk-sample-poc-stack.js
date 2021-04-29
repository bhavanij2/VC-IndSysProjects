"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const lambda = require("@aws-cdk/aws-lambda");
const iam = require("@aws-cdk/aws-iam");
class IsAwsCdkSamplePocStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.node.apply(new cdk.Tag('mon:owner', 'BBJANG'));
        this.node.apply(new cdk.Tag('mon:project', 'ValueCapture'));
        this.node.apply(new cdk.Tag('mon:cost-center', 'ValueCapture'));
        this.node.apply(new cdk.Tag('mon:env', 'non-prod'));
        this.node.apply(new cdk.Tag('mon:regulated', 'no'));
        this.node.apply(new cdk.Tag('mon:data-classification', 'internal'));
        const lambdaRole = iam.Role.import(this, 'vcis-lambda-test-role', {
            roleArn: 'arn:aws:iam::019181870962:role/VcisLambdaRole-test'
        });
        new lambda.Function(this, 'vcis-lambda-test', {
            functionName: 'vcis-lambda-test',
            runtime: lambda.Runtime.NodeJS810,
            code: lambda.Code.asset('lambda'),
            handler: 'index.handler',
            role: lambdaRole
        });
    }
}
exports.IsAwsCdkSamplePocStack = IsAwsCdkSamplePocStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYXdzLWNkay1zYW1wbGUtcG9jLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXMtYXdzLWNkay1zYW1wbGUtcG9jLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXFDO0FBQ3JDLDhDQUErQztBQUMvQyx3Q0FBeUM7QUFFekMsTUFBYSxzQkFBdUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNuRCxZQUFZLEtBQWMsRUFBRSxFQUFVLEVBQUUsS0FBc0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztRQUMvRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO1FBRW5FLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUNoRSxPQUFPLEVBQUUsb0RBQW9EO1NBQzlELENBQUMsQ0FBQztRQUVILElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7WUFDNUMsWUFBWSxFQUFFLGtCQUFrQjtZQUNoQyxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTO1lBQ2pDLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDakMsT0FBTyxFQUFFLGVBQWU7WUFDeEIsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdkJELHdEQXVCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjZGsgPSByZXF1aXJlKCdAYXdzLWNkay9jZGsnKTtcbmltcG9ydCBsYW1iZGEgPSByZXF1aXJlKCdAYXdzLWNkay9hd3MtbGFtYmRhJyk7XG5pbXBvcnQgaWFtID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWlhbScpO1xuXG5leHBvcnQgY2xhc3MgSXNBd3NDZGtTYW1wbGVQb2NTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBjZGsuQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICB0aGlzLm5vZGUuYXBwbHkobmV3IGNkay5UYWcoJ21vbjpvd25lcicsJ0JCSkFORycpKTtcbiAgICB0aGlzLm5vZGUuYXBwbHkobmV3IGNkay5UYWcoJ21vbjpwcm9qZWN0JywnVmFsdWVDYXB0dXJlJykpO1xuICAgIHRoaXMubm9kZS5hcHBseShuZXcgY2RrLlRhZygnbW9uOmNvc3QtY2VudGVyJywnVmFsdWVDYXB0dXJlJykpO1xuICAgIHRoaXMubm9kZS5hcHBseShuZXcgY2RrLlRhZygnbW9uOmVudicsJ25vbi1wcm9kJykpO1xuICAgIHRoaXMubm9kZS5hcHBseShuZXcgY2RrLlRhZygnbW9uOnJlZ3VsYXRlZCcsJ25vJykpO1xuICAgIHRoaXMubm9kZS5hcHBseShuZXcgY2RrLlRhZygnbW9uOmRhdGEtY2xhc3NpZmljYXRpb24nLCdpbnRlcm5hbCcpKTtcblxuICAgIGNvbnN0IGxhbWJkYVJvbGUgPSBpYW0uUm9sZS5pbXBvcnQodGhpcywgJ3ZjaXMtbGFtYmRhLXRlc3Qtcm9sZScsIHtcbiAgICAgIHJvbGVBcm46ICdhcm46YXdzOmlhbTo6MDE5MTgxODcwOTYyOnJvbGUvVmNpc0xhbWJkYVJvbGUtdGVzdCdcbiAgICB9KTtcblxuICAgIG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgJ3ZjaXMtbGFtYmRhLXRlc3QnLCB7XG4gICAgICBmdW5jdGlvbk5hbWU6ICd2Y2lzLWxhbWJkYS10ZXN0JyxcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5vZGVKUzgxMCxcbiAgICAgIGNvZGU6IGxhbWJkYS5Db2RlLmFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdpbmRleC5oYW5kbGVyJyxcbiAgICAgIHJvbGU6IGxhbWJkYVJvbGVcbiAgICB9KTtcbiAgfVxufVxuIl19