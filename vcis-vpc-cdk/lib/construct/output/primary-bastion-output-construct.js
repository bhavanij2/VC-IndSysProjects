"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
class PrimaryBastionOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.createPrimaryBastionIPOutput();
        this.createPrimaryBastionDNSOutput();
    }
    createPrimaryBastionIPOutput() {
        new cdk_1.CfnOutput(this.scope, 'PrimaryBastionIPOutput', {
            description: 'Primary Bastion Host IP',
            value: this.props.primaryBastion.instanceEIP.eipIp,
            export: `${this.props.stackName}-PrimaryBastionIP`
        })
            .makeImportValue()
            .toString();
    }
    createPrimaryBastionDNSOutput() {
        new cdk_1.CfnOutput(this.scope, 'PrimaryBastionDNSOutput', {
            description: 'Primary Bastion DNS entry',
            value: this.props.primaryBastion.instance.instancePublicDnsName,
            export: `${this.props.stackName}-PrimaryBastionDNS`
        })
            .makeImportValue()
            .toString();
    }
}
exports.PrimaryBastionOutputConstruct = PrimaryBastionOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJpbWFyeS1iYXN0aW9uLW91dHB1dC1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcmltYXJ5LWJhc3Rpb24tb3V0cHV0LWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUFvRDtBQUdwRCxNQUFhLDZCQUE2QjtJQUN0QyxZQUE2QixLQUFnQixFQUFVLEtBQXlCO1FBQW5ELFVBQUssR0FBTCxLQUFLLENBQVc7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFvQjtRQUM1RSxJQUFJLENBQUMsNEJBQTRCLEVBQUUsQ0FBQztRQUNwQyxJQUFJLENBQUMsNkJBQTZCLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBRU8sNEJBQTRCO1FBQ2hDLElBQUksZUFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7WUFDaEQsV0FBVyxFQUFFLHlCQUF5QjtZQUN0QyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDbEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLG1CQUFtQjtTQUNyRCxDQUFDO2FBQ0csZUFBZSxFQUFFO2FBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTyw2QkFBNkI7UUFDakMsSUFBSSxlQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtZQUNqRCxXQUFXLEVBQUUsMkJBQTJCO1lBQ3hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMscUJBQXFCO1lBQy9ELE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxvQkFBb0I7U0FDdEQsQ0FBQzthQUNHLGVBQWUsRUFBRTthQUNqQixRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0o7QUF6QkQsc0VBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2ZuT3V0cHV0LCBDb25zdHJ1Y3QgfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQgeyBWY2lzVnBjT3V0cHV0UHJvcHMgfSBmcm9tIFwiLi92Y2lzLXZwYy1vdXRwdXQtY29uc3RydWN0XCI7XG5cbmV4cG9ydCBjbGFzcyBQcmltYXJ5QmFzdGlvbk91dHB1dENvbnN0cnVjdCB7XG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0LCBwcml2YXRlIHByb3BzOiBWY2lzVnBjT3V0cHV0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVQcmltYXJ5QmFzdGlvbklQT3V0cHV0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUHJpbWFyeUJhc3Rpb25ETlNPdXRwdXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVByaW1hcnlCYXN0aW9uSVBPdXRwdXQoKSB7XG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zY29wZSwgJ1ByaW1hcnlCYXN0aW9uSVBPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1ByaW1hcnkgQmFzdGlvbiBIb3N0IElQJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnByaW1hcnlCYXN0aW9uLmluc3RhbmNlRUlQLmVpcElwLFxuICAgICAgICAgICAgZXhwb3J0OiBgJHt0aGlzLnByb3BzLnN0YWNrTmFtZX0tUHJpbWFyeUJhc3Rpb25JUGBcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYWtlSW1wb3J0VmFsdWUoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQcmltYXJ5QmFzdGlvbkROU091dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnUHJpbWFyeUJhc3Rpb25ETlNPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1ByaW1hcnkgQmFzdGlvbiBETlMgZW50cnknLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMucHJpbWFyeUJhc3Rpb24uaW5zdGFuY2UuaW5zdGFuY2VQdWJsaWNEbnNOYW1lLFxuICAgICAgICAgICAgZXhwb3J0OiBgJHt0aGlzLnByb3BzLnN0YWNrTmFtZX0tUHJpbWFyeUJhc3Rpb25ETlNgXG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFrZUltcG9ydFZhbHVlKClcbiAgICAgICAgICAgIC50b1N0cmluZygpO1xuICAgIH1cbn0iXX0=