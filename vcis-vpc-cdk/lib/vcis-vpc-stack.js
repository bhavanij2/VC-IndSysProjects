"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
const vpc_bastion_instances_construct_1 = require("./construct/bastion-instance/vpc-bastion-instances-construct");
const vcis_vpc_output_construct_1 = require("./construct/output/vcis-vpc-output-construct");
const vpc_parameter_store_output_construct_1 = require("./construct/output/vpc-parameter-store-output-construct");
const vpc_bastion_instance_sg_construct_1 = require("./construct/security-group/vpc-bastion-instance-sg-construct");
const vpc_security_groups_construct_1 = require("./construct/security-group/vpc-security-groups-construct");
const vcis_vpc_2az_construct_1 = require("./construct/vpc/vcis-vpc-2az-construct");
class VcisVpcStack extends vcis_cdk_utils_1.VcisStack {
    constructor(app, id, props) {
        super(app, id, props);
        const vpc = new vcis_vpc_2az_construct_1.VcisVpc2AzConstruct().createVpc(this);
        const bastionSg = new vpc_bastion_instance_sg_construct_1.VpcBastionInstanceSGConstruct(this, vpc).bastionInstanceSecurityGroup;
        const bastionInstances = new vpc_bastion_instances_construct_1.VpcBastionInstancesConstruct(this, vpc, bastionSg).bastionInstances;
        const vpcSecurityGroups = this.createVpcSecurityGroups(vpc, bastionSg);
        this.output = {
            vpc: vpc,
            sshSecurityGroup: vpcSecurityGroups.sshSecurityGroup,
            rdsSecurityGroup: vpcSecurityGroups.rdsSecurityGroup
        };
        this.persistVpcOutputInParameterStore();
        this.export(vpc, bastionInstances.primary, bastionInstances.secondary);
    }
    createVpcSecurityGroups(vpc, bastionSg) {
        return new vpc_security_groups_construct_1.VpcSecurityGroupsConstruct(this, vpc, bastionSg);
    }
    persistVpcOutputInParameterStore() {
        new vpc_parameter_store_output_construct_1.VpcParameterStoreOutputConstruct(this, {
            parentAppNode: this.parentApp().node,
            vpc: this.output.vpc,
            sshSecurityGroup: this.output.sshSecurityGroup,
            rdsSecurityGroup: this.output.rdsSecurityGroup
        });
    }
    export(vpc, primaryBastion, secondaryBastion) {
        const bastionHostKeyName = (vcis_cdk_utils_1.InputParameterHolder.get('inputs'))['bastionHostKeyName'];
        new vcis_vpc_output_construct_1.VcisVpcOutputConstruct(this, {
            stackName: this.stackName,
            bastionHostKeyName: bastionHostKeyName,
            vpc: vpc,
            primaryBastion: primaryBastion,
            secondaryBastion: secondaryBastion
        });
    }
}
exports.VcisVpcStack = VcisVpcStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmNpcy12cGMtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Y2lzLXZwYy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLCtEQUFzRjtBQUV0RixrSEFBNEc7QUFDNUcsNEZBQXNGO0FBQ3RGLGtIQUEyRztBQUMzRyxvSEFBNkc7QUFDN0csNEdBQXNHO0FBQ3RHLG1GQUE2RTtBQVM3RSxNQUFhLFlBQWEsU0FBUSwwQkFBNkM7SUFDN0UsWUFBWSxHQUFZLEVBQUUsRUFBVSxFQUFFLEtBQXNCO1FBQzFELEtBQUssQ0FBQyxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXRCLE1BQU0sR0FBRyxHQUFHLElBQUksNENBQW1CLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdEQsTUFBTSxTQUFTLEdBQUcsSUFBSSxpRUFBNkIsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUMsNEJBQTRCLENBQUM7UUFDNUYsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLDhEQUE0QixDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7UUFDakcsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLENBQUMsdUJBQXVCLENBQUMsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWixHQUFHLEVBQUUsR0FBRztZQUNSLGdCQUFnQixFQUFFLGlCQUFpQixDQUFDLGdCQUFnQjtZQUNwRCxnQkFBZ0IsRUFBRSxpQkFBaUIsQ0FBQyxnQkFBZ0I7U0FDckQsQ0FBQTtRQUVELElBQUksQ0FBQyxnQ0FBZ0MsRUFBRSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN6RSxDQUFDO0lBRU8sdUJBQXVCLENBQUMsR0FBbUIsRUFBRSxTQUE0QjtRQUMvRSxPQUFPLElBQUksMERBQTBCLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUM5RCxDQUFDO0lBRU8sZ0NBQWdDO1FBQ3RDLElBQUksdUVBQWdDLENBQUMsSUFBSSxFQUFFO1lBQ3pDLGFBQWEsRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFJLENBQUMsSUFBSTtZQUN0QyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHO1lBQ3BCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1lBQzlDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCO1NBQy9DLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFTyxNQUFNLENBQUMsR0FBbUIsRUFBRSxjQUF3QyxFQUFFLGdCQUEwQztRQUN0SCxNQUFNLGtCQUFrQixHQUFHLENBQUMscUNBQW9CLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUV0RixJQUFJLGtEQUFzQixDQUFDLElBQUksRUFBRTtZQUMvQixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsa0JBQWtCLEVBQUUsa0JBQWtCO1lBQ3RDLEdBQUcsRUFBRSxHQUFHO1lBQ1IsY0FBYyxFQUFFLGNBQWM7WUFDOUIsZ0JBQWdCLEVBQUUsZ0JBQWdCO1NBQ25DLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNDRCxvQ0EyQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY2RrJyk7XG5pbXBvcnQgeyBWY2lzQXBwLCBWY2lzU3RhY2ssIElucHV0UGFyYW1ldGVySG9sZGVyIH0gZnJvbSAnQG1vbnNhbnRvaXQvdmNpcy1jZGstdXRpbHMnO1xuaW1wb3J0IHsgQmFzdGlvbkluc3RhbmNlQ29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvYmFzdGlvbi1pbnN0YW5jZS9iYXN0aW9uLWluc3RhbmNlLWNvbnN0cnVjdCc7XG5pbXBvcnQgeyBWcGNCYXN0aW9uSW5zdGFuY2VzQ29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvYmFzdGlvbi1pbnN0YW5jZS92cGMtYmFzdGlvbi1pbnN0YW5jZXMtY29uc3RydWN0JztcbmltcG9ydCB7IFZjaXNWcGNPdXRwdXRDb25zdHJ1Y3QgfSBmcm9tICcuL2NvbnN0cnVjdC9vdXRwdXQvdmNpcy12cGMtb3V0cHV0LWNvbnN0cnVjdCc7XG5pbXBvcnQgeyBWcGNQYXJhbWV0ZXJTdG9yZU91dHB1dENvbnN0cnVjdCB9IGZyb20gJy4vY29uc3RydWN0L291dHB1dC92cGMtcGFyYW1ldGVyLXN0b3JlLW91dHB1dC1jb25zdHJ1Y3QnO1xuaW1wb3J0IHsgVnBjQmFzdGlvbkluc3RhbmNlU0dDb25zdHJ1Y3QgfSBmcm9tICcuL2NvbnN0cnVjdC9zZWN1cml0eS1ncm91cC92cGMtYmFzdGlvbi1pbnN0YW5jZS1zZy1jb25zdHJ1Y3QnO1xuaW1wb3J0IHsgVnBjU2VjdXJpdHlHcm91cHNDb25zdHJ1Y3QgfSBmcm9tICcuL2NvbnN0cnVjdC9zZWN1cml0eS1ncm91cC92cGMtc2VjdXJpdHktZ3JvdXBzLWNvbnN0cnVjdCc7XG5pbXBvcnQgeyBWY2lzVnBjMkF6Q29uc3RydWN0IH0gZnJvbSAnLi9jb25zdHJ1Y3QvdnBjL3ZjaXMtdnBjLTJhei1jb25zdHJ1Y3QnO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lYzInKTtcblxuZXhwb3J0IGludGVyZmFjZSBWY2lzVnBjU3RhY2tPdXRwdXQge1xuICB2cGM6IGVjMi5WcGNOZXR3b3JrLFxuICBzc2hTZWN1cml0eUdyb3VwOiBlYzIuQ2ZuU2VjdXJpdHlHcm91cCxcbiAgcmRzU2VjdXJpdHlHcm91cDogZWMyLkNmblNlY3VyaXR5R3JvdXBcbn1cblxuZXhwb3J0IGNsYXNzIFZjaXNWcGNTdGFjayBleHRlbmRzIFZjaXNTdGFjazxjZGsuU3RhY2tQcm9wcywgVmNpc1ZwY1N0YWNrT3V0cHV0PiAge1xuICBjb25zdHJ1Y3RvcihhcHA6IFZjaXNBcHAsIGlkOiBzdHJpbmcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihhcHAsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCB2cGMgPSBuZXcgVmNpc1ZwYzJBekNvbnN0cnVjdCgpLmNyZWF0ZVZwYyh0aGlzKTtcbiAgICBjb25zdCBiYXN0aW9uU2cgPSBuZXcgVnBjQmFzdGlvbkluc3RhbmNlU0dDb25zdHJ1Y3QodGhpcywgdnBjKS5iYXN0aW9uSW5zdGFuY2VTZWN1cml0eUdyb3VwO1xuICAgIGNvbnN0IGJhc3Rpb25JbnN0YW5jZXMgPSBuZXcgVnBjQmFzdGlvbkluc3RhbmNlc0NvbnN0cnVjdCh0aGlzLCB2cGMsIGJhc3Rpb25TZykuYmFzdGlvbkluc3RhbmNlcztcbiAgICBjb25zdCB2cGNTZWN1cml0eUdyb3VwcyA9IHRoaXMuY3JlYXRlVnBjU2VjdXJpdHlHcm91cHModnBjLCBiYXN0aW9uU2cpO1xuXG4gICAgdGhpcy5vdXRwdXQgPSB7XG4gICAgICB2cGM6IHZwYyxcbiAgICAgIHNzaFNlY3VyaXR5R3JvdXA6IHZwY1NlY3VyaXR5R3JvdXBzLnNzaFNlY3VyaXR5R3JvdXAsXG4gICAgICByZHNTZWN1cml0eUdyb3VwOiB2cGNTZWN1cml0eUdyb3Vwcy5yZHNTZWN1cml0eUdyb3VwXG4gICAgfVxuXG4gICAgdGhpcy5wZXJzaXN0VnBjT3V0cHV0SW5QYXJhbWV0ZXJTdG9yZSgpO1xuICAgIHRoaXMuZXhwb3J0KHZwYywgYmFzdGlvbkluc3RhbmNlcy5wcmltYXJ5LCBiYXN0aW9uSW5zdGFuY2VzLnNlY29uZGFyeSk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVZwY1NlY3VyaXR5R3JvdXBzKHZwYzogZWMyLlZwY05ldHdvcmssIGJhc3Rpb25TZzogZWMyLlNlY3VyaXR5R3JvdXApOiBWcGNTZWN1cml0eUdyb3Vwc0NvbnN0cnVjdCB7XG4gICAgcmV0dXJuIG5ldyBWcGNTZWN1cml0eUdyb3Vwc0NvbnN0cnVjdCh0aGlzLCB2cGMsIGJhc3Rpb25TZyk7XG4gIH1cblxuICBwcml2YXRlIHBlcnNpc3RWcGNPdXRwdXRJblBhcmFtZXRlclN0b3JlKCkge1xuICAgIG5ldyBWcGNQYXJhbWV0ZXJTdG9yZU91dHB1dENvbnN0cnVjdCh0aGlzLCB7XG4gICAgICBwYXJlbnRBcHBOb2RlOiB0aGlzLnBhcmVudEFwcCgpISEubm9kZSxcbiAgICAgIHZwYzogdGhpcy5vdXRwdXQudnBjLFxuICAgICAgc3NoU2VjdXJpdHlHcm91cDogdGhpcy5vdXRwdXQuc3NoU2VjdXJpdHlHcm91cCxcbiAgICAgIHJkc1NlY3VyaXR5R3JvdXA6IHRoaXMub3V0cHV0LnJkc1NlY3VyaXR5R3JvdXBcbiAgICB9KVxuICB9XG5cbiAgcHJpdmF0ZSBleHBvcnQodnBjOiBlYzIuVnBjTmV0d29yaywgcHJpbWFyeUJhc3Rpb246IEJhc3Rpb25JbnN0YW5jZUNvbnN0cnVjdCwgc2Vjb25kYXJ5QmFzdGlvbjogQmFzdGlvbkluc3RhbmNlQ29uc3RydWN0KTogdm9pZCB7XG4gICAgY29uc3QgYmFzdGlvbkhvc3RLZXlOYW1lID0gKElucHV0UGFyYW1ldGVySG9sZGVyLmdldCgnaW5wdXRzJykpWydiYXN0aW9uSG9zdEtleU5hbWUnXTtcblxuICAgIG5ldyBWY2lzVnBjT3V0cHV0Q29uc3RydWN0KHRoaXMsIHtcbiAgICAgIHN0YWNrTmFtZTogdGhpcy5zdGFja05hbWUsXG4gICAgICBiYXN0aW9uSG9zdEtleU5hbWU6IGJhc3Rpb25Ib3N0S2V5TmFtZSxcbiAgICAgIHZwYzogdnBjLFxuICAgICAgcHJpbWFyeUJhc3Rpb246IHByaW1hcnlCYXN0aW9uLFxuICAgICAgc2Vjb25kYXJ5QmFzdGlvbjogc2Vjb25kYXJ5QmFzdGlvblxuICAgIH0pO1xuICB9XG59Il19