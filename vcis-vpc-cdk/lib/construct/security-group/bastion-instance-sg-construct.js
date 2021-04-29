"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
const ec2 = require("@aws-cdk/aws-ec2");
class BastionInstanceSGConstruct {
    constructor(scope, id, props) {
        this.props = props;
        this.securityGroup = new ec2.SecurityGroup(scope, id, {
            groupName: props.groupName,
            vpc: this.props.vpc,
            description: "Bastion Host security group. Other servers in this VPC should only accept SSH traffic from this group",
            allowAllOutbound: true
        });
        this.setupBastionSGIngressRules();
    }
    setupBastionSGIngressRules() {
        if (!this.props.primaryCentralBastionIP) {
            throw new Error('Error: Primary Central Bastion IP Input Parameter is required.');
        }
        this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${this.props.primaryCentralBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from central bastion primary instance');
        if (this.props.secondaryCentralBastionIP) {
            this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${this.props.secondaryCentralBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from central bastion secondary instance');
        }
        this.securityGroup.node.apply(new cdk_1.Tag('Name', `${this.props.stackName}/${this.props.groupName}`));
    }
}
exports.BastionInstanceSGConstruct = BastionInstanceSGConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzdGlvbi1pbnN0YW5jZS1zZy1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXN0aW9uLWluc3RhbmNlLXNnLWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHNDQUE4QztBQUM5Qyx3Q0FBeUM7QUFVekMsTUFBYSwwQkFBMEI7SUFHbkMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBbUIsS0FBNkI7UUFBN0IsVUFBSyxHQUFMLEtBQUssQ0FBd0I7UUFFcEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNsRCxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDMUIsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRztZQUNuQixXQUFXLEVBQUUsdUdBQXVHO1lBQ3BILGdCQUFnQixFQUFFLElBQUk7U0FDekIsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLDBCQUEwQixFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVPLDBCQUEwQjtRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsRUFBRTtZQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLGdFQUFnRSxDQUFDLENBQUE7U0FDcEY7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLHVCQUF1QixLQUFLLENBQUMsRUFBRSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsd0RBQXdELENBQUMsQ0FBQztRQUUvSyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQUMsSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsS0FBSyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLDBEQUEwRCxDQUFDLENBQUM7U0FDdEw7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxTQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDdEcsQ0FBQztDQUNKO0FBM0JELGdFQTJCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCwgVGFnIH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lYzInKTtcblxuZXhwb3J0IGludGVyZmFjZSBCYXN0aW9uSW5zdGFuY2VTR1Byb3BzIHtcbiAgICBzdGFja05hbWU6IHN0cmluZyxcbiAgICBncm91cE5hbWU6IHN0cmluZyxcbiAgICB2cGM6IGVjMi5WcGNOZXR3b3JrLFxuICAgIHByaW1hcnlDZW50cmFsQmFzdGlvbklQOiBzdHJpbmcsXG4gICAgc2Vjb25kYXJ5Q2VudHJhbEJhc3Rpb25JUDogc3RyaW5nXG59XG5cbmV4cG9ydCBjbGFzcyBCYXN0aW9uSW5zdGFuY2VTR0NvbnN0cnVjdCB7XG4gICAgcmVhZG9ubHkgc2VjdXJpdHlHcm91cDogZWMyLlNlY3VyaXR5R3JvdXA7XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IHByb3BzOiBCYXN0aW9uSW5zdGFuY2VTR1Byb3BzKSB7XG5cbiAgICAgICAgdGhpcy5zZWN1cml0eUdyb3VwID0gbmV3IGVjMi5TZWN1cml0eUdyb3VwKHNjb3BlLCBpZCwge1xuICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICAgICAgICB2cGM6IHRoaXMucHJvcHMudnBjLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFwiQmFzdGlvbiBIb3N0IHNlY3VyaXR5IGdyb3VwLiBPdGhlciBzZXJ2ZXJzIGluIHRoaXMgVlBDIHNob3VsZCBvbmx5IGFjY2VwdCBTU0ggdHJhZmZpYyBmcm9tIHRoaXMgZ3JvdXBcIixcbiAgICAgICAgICAgIGFsbG93QWxsT3V0Ym91bmQ6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2V0dXBCYXN0aW9uU0dJbmdyZXNzUnVsZXMoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHNldHVwQmFzdGlvblNHSW5ncmVzc1J1bGVzKCkge1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMucHJpbWFyeUNlbnRyYWxCYXN0aW9uSVApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3I6IFByaW1hcnkgQ2VudHJhbCBCYXN0aW9uIElQIElucHV0IFBhcmFtZXRlciBpcyByZXF1aXJlZC4nKVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zZWN1cml0eUdyb3VwLmFkZEluZ3Jlc3NSdWxlKG5ldyBlYzIuQ2lkcklQdjQoYCR7dGhpcy5wcm9wcy5wcmltYXJ5Q2VudHJhbEJhc3Rpb25JUH0vMzJgKSwgbmV3IGVjMi5UY3BQb3J0KDIyKSwgJ2FsbG93IHNzaCBhY2Nlc3MgZnJvbSBjZW50cmFsIGJhc3Rpb24gcHJpbWFyeSBpbnN0YW5jZScpO1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnNlY29uZGFyeUNlbnRyYWxCYXN0aW9uSVApIHtcbiAgICAgICAgICAgIHRoaXMuc2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShuZXcgZWMyLkNpZHJJUHY0KGAke3RoaXMucHJvcHMuc2Vjb25kYXJ5Q2VudHJhbEJhc3Rpb25JUH0vMzJgKSwgbmV3IGVjMi5UY3BQb3J0KDIyKSwgJ2FsbG93IHNzaCBhY2Nlc3MgZnJvbSBjZW50cmFsIGJhc3Rpb24gc2Vjb25kYXJ5IGluc3RhbmNlJyk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNlY3VyaXR5R3JvdXAubm9kZS5hcHBseShuZXcgVGFnKCdOYW1lJywgYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LyR7dGhpcy5wcm9wcy5ncm91cE5hbWV9YCkpO1xuICAgIH1cbn0iXX0=