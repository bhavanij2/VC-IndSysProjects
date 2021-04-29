"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
const primary_bastion_output_construct_1 = require("./primary-bastion-output-construct");
const secondary_bastion_output_construct_1 = require("./secondary-bastion-output-construct");
class BastionOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.createBastionHostKeyNameOutput();
        this.createBastionSecurityGroupOutput();
        this.createPrimaryBastionOutput();
        this.createSecondaryBastionOutput();
    }
    createBastionHostKeyNameOutput() {
        new cdk_1.CfnOutput(this.scope, 'BastionHostKeyNameOutput', {
            description: 'Key name used for the VPC\'s bastion hosts',
            value: this.props.bastionHostKeyName,
            export: `${this.props.stackName}-BastionHostKeyName`
        })
            .makeImportValue()
            .toString();
    }
    createBastionSecurityGroupOutput() {
        new cdk_1.CfnOutput(this.scope, 'BastionSGOutput', {
            description: 'Bastion Host security group.  Other servers in this VPC should only accept SSH traffic from this group',
            value: this.props.primaryBastion.securityGroup.securityGroupName,
            export: `${this.props.stackName}-BastionSG`
        })
            .makeImportValue()
            .toString();
    }
    createPrimaryBastionOutput() {
        new primary_bastion_output_construct_1.PrimaryBastionOutputConstruct(this.scope, this.props);
    }
    createSecondaryBastionOutput() {
        new secondary_bastion_output_construct_1.SecondaryBastionOutputConstruct(this.scope, this.props);
    }
}
exports.BastionOutputConstruct = BastionOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzdGlvbi1vdXRwdXQtY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYmFzdGlvbi1vdXRwdXQtY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9EO0FBQ3BELHlGQUFtRjtBQUNuRiw2RkFBdUY7QUFHdkYsTUFBYSxzQkFBc0I7SUFDL0IsWUFBNkIsS0FBZ0IsRUFBVSxLQUF5QjtRQUFuRCxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDNUUsSUFBSSxDQUFDLDhCQUE4QixFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7UUFDbEMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7SUFDeEMsQ0FBQztJQUVPLDhCQUE4QjtRQUNsQyxJQUFJLGVBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLDBCQUEwQixFQUFFO1lBQ2xELFdBQVcsRUFBRSw0Q0FBNEM7WUFDekQsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsa0JBQWtCO1lBQ3BDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxxQkFBcUI7U0FDdkQsQ0FBQzthQUNHLGVBQWUsRUFBRTthQUNqQixRQUFRLEVBQUUsQ0FBQztJQUNwQixDQUFDO0lBRU8sZ0NBQWdDO1FBQ3BDLElBQUksZUFBUyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsaUJBQWlCLEVBQUU7WUFDekMsV0FBVyxFQUFFLHdHQUF3RztZQUNySCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtZQUNoRSxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsWUFBWTtTQUM5QyxDQUFDO2FBQ0csZUFBZSxFQUFFO2FBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7SUFFTywwQkFBMEI7UUFDOUIsSUFBSSxnRUFBNkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sNEJBQTRCO1FBQ2hDLElBQUksb0VBQStCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDaEUsQ0FBQztDQUNKO0FBbkNELHdEQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0IH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IHsgUHJpbWFyeUJhc3Rpb25PdXRwdXRDb25zdHJ1Y3QgfSBmcm9tIFwiLi9wcmltYXJ5LWJhc3Rpb24tb3V0cHV0LWNvbnN0cnVjdFwiO1xuaW1wb3J0IHsgU2Vjb25kYXJ5QmFzdGlvbk91dHB1dENvbnN0cnVjdCB9IGZyb20gXCIuL3NlY29uZGFyeS1iYXN0aW9uLW91dHB1dC1jb25zdHJ1Y3RcIjtcbmltcG9ydCB7IFZjaXNWcGNPdXRwdXRQcm9wcyB9IGZyb20gXCIuL3ZjaXMtdnBjLW91dHB1dC1jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIEJhc3Rpb25PdXRwdXRDb25zdHJ1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IENvbnN0cnVjdCwgcHJpdmF0ZSBwcm9wczogVmNpc1ZwY091dHB1dFByb3BzKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlQmFzdGlvbkhvc3RLZXlOYW1lT3V0cHV0KCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQmFzdGlvblNlY3VyaXR5R3JvdXBPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVQcmltYXJ5QmFzdGlvbk91dHB1dCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVNlY29uZGFyeUJhc3Rpb25PdXRwdXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUJhc3Rpb25Ib3N0S2V5TmFtZU91dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnQmFzdGlvbkhvc3RLZXlOYW1lT3V0cHV0Jywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdLZXkgbmFtZSB1c2VkIGZvciB0aGUgVlBDXFwncyBiYXN0aW9uIGhvc3RzJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLmJhc3Rpb25Ib3N0S2V5TmFtZSxcbiAgICAgICAgICAgIGV4cG9ydDogYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LUJhc3Rpb25Ib3N0S2V5TmFtZWBcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYWtlSW1wb3J0VmFsdWUoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVCYXN0aW9uU2VjdXJpdHlHcm91cE91dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnQmFzdGlvblNHT3V0cHV0Jywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdCYXN0aW9uIEhvc3Qgc2VjdXJpdHkgZ3JvdXAuICBPdGhlciBzZXJ2ZXJzIGluIHRoaXMgVlBDIHNob3VsZCBvbmx5IGFjY2VwdCBTU0ggdHJhZmZpYyBmcm9tIHRoaXMgZ3JvdXAnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMucHJpbWFyeUJhc3Rpb24uc2VjdXJpdHlHcm91cC5zZWN1cml0eUdyb3VwTmFtZSxcbiAgICAgICAgICAgIGV4cG9ydDogYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LUJhc3Rpb25TR2BcbiAgICAgICAgfSlcbiAgICAgICAgICAgIC5tYWtlSW1wb3J0VmFsdWUoKVxuICAgICAgICAgICAgLnRvU3RyaW5nKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQcmltYXJ5QmFzdGlvbk91dHB1dCgpIHtcbiAgICAgICAgbmV3IFByaW1hcnlCYXN0aW9uT3V0cHV0Q29uc3RydWN0KHRoaXMuc2NvcGUsIHRoaXMucHJvcHMpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY3JlYXRlU2Vjb25kYXJ5QmFzdGlvbk91dHB1dCgpIHtcbiAgICAgICAgbmV3IFNlY29uZGFyeUJhc3Rpb25PdXRwdXRDb25zdHJ1Y3QodGhpcy5zY29wZSwgdGhpcy5wcm9wcyk7XG4gICAgfVxufSJdfQ==