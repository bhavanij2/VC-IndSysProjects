"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
class SecondaryBastionOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.createSecondaryBastionIpOutput();
        this.createSecondaryBastionDNSOutput();
    }
    createSecondaryBastionIpOutput() {
        new cdk_1.CfnOutput(this.scope, 'SecondaryBastionIPOutput', {
            description: 'Secondary Bastion Host IP',
            value: this.props.secondaryBastion.instanceEIP.eipIp,
            export: `${this.props.stackName}-SecondaryBastionIP`
        })
            .makeImportValue()
            .toString();
    }
    createSecondaryBastionDNSOutput() {
        new cdk_1.CfnOutput(this.scope, 'SecondaryBastionDNSOutput', {
            description: 'Secondary Bastion Host DNS entry',
            value: this.props.secondaryBastion.instance.instancePublicDnsName,
            export: `${this.props.stackName}-SecondaryBastionDNS`
        })
            .makeImportValue()
            .toString();
    }
}
exports.SecondaryBastionOutputConstruct = SecondaryBastionOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vjb25kYXJ5LWJhc3Rpb24tb3V0cHV0LWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNlY29uZGFyeS1iYXN0aW9uLW91dHB1dC1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFHcEQsTUFBYSwrQkFBK0I7SUFFeEMsWUFBNkIsS0FBZ0IsRUFBVSxLQUF5QjtRQUFuRCxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDNUUsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLCtCQUErQixFQUFFLENBQUM7SUFDM0MsQ0FBQztJQUVPLDhCQUE4QjtRQUNsQyxJQUFJLGVBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDBCQUEwQixFQUFFO1lBQ2xELFdBQVcsRUFBRSwyQkFBMkI7WUFDeEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLEtBQUs7WUFDcEQsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLHFCQUFxQjtTQUN2RCxDQUFDO2FBQ0csZUFBZSxFQUFFO2FBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTywrQkFBK0I7UUFDbkMsSUFBSSxlQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSwyQkFBMkIsRUFBRTtZQUNuRCxXQUFXLEVBQUUsa0NBQWtDO1lBQy9DLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxxQkFBcUI7WUFDakUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLHNCQUFzQjtTQUN4RCxDQUFDO2FBQ0csZUFBZSxFQUFFO2FBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTFCRCwwRUEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIENvbnN0cnVjdCB9IGZyb20gXCJAYXdzLWNkay9jZGtcIjtcbmltcG9ydCB7IFZjaXNWcGNPdXRwdXRQcm9wcyB9IGZyb20gXCIuL3ZjaXMtdnBjLW91dHB1dC1jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIFNlY29uZGFyeUJhc3Rpb25PdXRwdXRDb25zdHJ1Y3Qge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0LCBwcml2YXRlIHByb3BzOiBWY2lzVnBjT3V0cHV0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVTZWNvbmRhcnlCYXN0aW9uSXBPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVTZWNvbmRhcnlCYXN0aW9uRE5TT3V0cHV0KCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTZWNvbmRhcnlCYXN0aW9uSXBPdXRwdXQoKSB7XG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zY29wZSwgJ1NlY29uZGFyeUJhc3Rpb25JUE91dHB1dCcsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2Vjb25kYXJ5IEJhc3Rpb24gSG9zdCBJUCcsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy5zZWNvbmRhcnlCYXN0aW9uLmluc3RhbmNlRUlQLmVpcElwLFxuICAgICAgICAgICAgZXhwb3J0OiBgJHt0aGlzLnByb3BzLnN0YWNrTmFtZX0tU2Vjb25kYXJ5QmFzdGlvbklQYFxuICAgICAgICB9KVxuICAgICAgICAgICAgLm1ha2VJbXBvcnRWYWx1ZSgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVNlY29uZGFyeUJhc3Rpb25ETlNPdXRwdXQoKSB7XG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zY29wZSwgJ1NlY29uZGFyeUJhc3Rpb25ETlNPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NlY29uZGFyeSBCYXN0aW9uIEhvc3QgRE5TIGVudHJ5JyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnNlY29uZGFyeUJhc3Rpb24uaW5zdGFuY2UuaW5zdGFuY2VQdWJsaWNEbnNOYW1lLFxuICAgICAgICAgICAgZXhwb3J0OiBgJHt0aGlzLnByb3BzLnN0YWNrTmFtZX0tU2Vjb25kYXJ5QmFzdGlvbkROU2BcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYWtlSW1wb3J0VmFsdWUoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgfVxufSJdfQ==