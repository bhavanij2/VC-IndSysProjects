"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_ec2_1 = require("@aws-cdk/aws-ec2");
const cdk_1 = require("@aws-cdk/cdk");
const ec2 = require("@aws-cdk/aws-ec2");
class VcisEC2InstanceSshSGConstruct {
    constructor(scope, id, props) {
        this.securityGroup = new ec2.CfnSecurityGroup(scope, id, {
            groupName: props.groupName,
            vpcId: props.vpc.vpcId,
            groupDescription: 'Allow ssh access to ec2 instances',
            securityGroupIngress: [
                {
                    ipProtocol: aws_ec2_1.Protocol.Tcp,
                    sourceSecurityGroupId: props.bastionSecurityGroup.securityGroupId,
                    fromPort: 22,
                    toPort: 22,
                    description: 'allow ssh access from Primary Bastion Server - SG'
                }
            ],
            securityGroupEgress: [
                {
                    ipProtocol: aws_ec2_1.Protocol.All,
                    cidrIp: '0.0.0.0/0'
                }
            ]
        });
        this.securityGroup.node.apply(new cdk_1.Tag('Name', `${props.stackName}/${props.groupName}`));
        // Commented L2 Security Group since it does not support creation of Ingress Rules with SecurityGroup Ingress Rule parameters. Implementing the same using L1 version above. But leaving this code here so that we can move to L2 version once CDK team supports this caveat.
        // this.securityGroup = new ec2.SecurityGroup(scope, id, {
        //     groupName: props.groupName,
        //     vpc: props.vpc,
        //     description: 'Allow ssh access to ec2 instances',
        //     allowAllOutbound: true
        // });
        // this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${props.primaryBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from Primary Bastion Server');
        // this.securityGroup.addIngressRule(new ec2.CidrIPv4(`${props.secondaryBastionIP}/32`), new ec2.TcpPort(22), 'allow ssh access from Secondary Bastion Server');
        // this.securityGroup.connections.addSecurityGroup(this.props.bastionSecurityGroup);
    }
}
exports.VcisEC2InstanceSshSGConstruct = VcisEC2InstanceSshSGConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmNpcy1lYzItaW5zdGFuY2Utc3NoLXNnLWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInZjaXMtZWMyLWluc3RhbmNlLXNzaC1zZy1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4Q0FBNEM7QUFDNUMsc0NBQThDO0FBQzlDLHdDQUF5QztBQVN6QyxNQUFhLDZCQUE2QjtJQUd0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWdDO1FBQ3RFLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRTtZQUNyRCxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDMUIsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSztZQUN0QixnQkFBZ0IsRUFBRSxtQ0FBbUM7WUFDckQsb0JBQW9CLEVBQUU7Z0JBQ2xCO29CQUNJLFVBQVUsRUFBRSxrQkFBUSxDQUFDLEdBQUc7b0JBQ3hCLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxlQUFlO29CQUNqRSxRQUFRLEVBQUUsRUFBRTtvQkFDWixNQUFNLEVBQUUsRUFBRTtvQkFDVixXQUFXLEVBQUUsbURBQW1EO2lCQUNuRTthQUNKO1lBQ0QsbUJBQW1CLEVBQUU7Z0JBQ2pCO29CQUNJLFVBQVUsRUFBRSxrQkFBUSxDQUFDLEdBQUc7b0JBQ3hCLE1BQU0sRUFBRSxXQUFXO2lCQUN0QjthQUNKO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksU0FBRyxDQUFDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUV4Riw2UUFBNlE7UUFFN1EsMERBQTBEO1FBQzFELGtDQUFrQztRQUNsQyxzQkFBc0I7UUFDdEIsd0RBQXdEO1FBQ3hELDZCQUE2QjtRQUM3QixNQUFNO1FBQ04sNEpBQTRKO1FBQzVKLGdLQUFnSztRQUNoSyxvRkFBb0Y7SUFDeEYsQ0FBQztDQUNKO0FBdENELHNFQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3RvY29sIH0gZnJvbSBcIkBhd3MtY2RrL2F3cy1lYzJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCwgVGFnIH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lYzInKTtcblxuZXhwb3J0IGludGVyZmFjZSBWY2lzRUMySW5zdGFuY2VTc2hTR1Byb3BzIHtcbiAgICBzdGFja05hbWU6IHN0cmluZyxcbiAgICBncm91cE5hbWU6IHN0cmluZyxcbiAgICB2cGM6IGVjMi5WcGNOZXR3b3JrLFxuICAgIGJhc3Rpb25TZWN1cml0eUdyb3VwOiBlYzIuU2VjdXJpdHlHcm91cFxufVxuXG5leHBvcnQgY2xhc3MgVmNpc0VDMkluc3RhbmNlU3NoU0dDb25zdHJ1Y3Qge1xuICAgIHJlYWRvbmx5IHNlY3VyaXR5R3JvdXA6IGVjMi5DZm5TZWN1cml0eUdyb3VwO1xuXG4gICAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IFZjaXNFQzJJbnN0YW5jZVNzaFNHUHJvcHMpIHtcbiAgICAgICAgdGhpcy5zZWN1cml0eUdyb3VwID0gbmV3IGVjMi5DZm5TZWN1cml0eUdyb3VwKHNjb3BlLCBpZCwge1xuICAgICAgICAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICAgICAgICB2cGNJZDogcHJvcHMudnBjLnZwY0lkLFxuICAgICAgICAgICAgZ3JvdXBEZXNjcmlwdGlvbjogJ0FsbG93IHNzaCBhY2Nlc3MgdG8gZWMyIGluc3RhbmNlcycsXG4gICAgICAgICAgICBzZWN1cml0eUdyb3VwSW5ncmVzczogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgaXBQcm90b2NvbDogUHJvdG9jb2wuVGNwLFxuICAgICAgICAgICAgICAgICAgICBzb3VyY2VTZWN1cml0eUdyb3VwSWQ6IHByb3BzLmJhc3Rpb25TZWN1cml0eUdyb3VwLnNlY3VyaXR5R3JvdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgZnJvbVBvcnQ6IDIyLFxuICAgICAgICAgICAgICAgICAgICB0b1BvcnQ6IDIyLFxuICAgICAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ2FsbG93IHNzaCBhY2Nlc3MgZnJvbSBQcmltYXJ5IEJhc3Rpb24gU2VydmVyIC0gU0cnXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIHNlY3VyaXR5R3JvdXBFZ3Jlc3M6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGlwUHJvdG9jb2w6IFByb3RvY29sLkFsbCxcbiAgICAgICAgICAgICAgICAgICAgY2lkcklwOiAnMC4wLjAuMC8wJ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuc2VjdXJpdHlHcm91cC5ub2RlLmFwcGx5KG5ldyBUYWcoJ05hbWUnLCBgJHtwcm9wcy5zdGFja05hbWV9LyR7cHJvcHMuZ3JvdXBOYW1lfWApKTtcblxuICAgICAgICAvLyBDb21tZW50ZWQgTDIgU2VjdXJpdHkgR3JvdXAgc2luY2UgaXQgZG9lcyBub3Qgc3VwcG9ydCBjcmVhdGlvbiBvZiBJbmdyZXNzIFJ1bGVzIHdpdGggU2VjdXJpdHlHcm91cCBJbmdyZXNzIFJ1bGUgcGFyYW1ldGVycy4gSW1wbGVtZW50aW5nIHRoZSBzYW1lIHVzaW5nIEwxIHZlcnNpb24gYWJvdmUuIEJ1dCBsZWF2aW5nIHRoaXMgY29kZSBoZXJlIHNvIHRoYXQgd2UgY2FuIG1vdmUgdG8gTDIgdmVyc2lvbiBvbmNlIENESyB0ZWFtIHN1cHBvcnRzIHRoaXMgY2F2ZWF0LlxuICAgICAgICBcbiAgICAgICAgLy8gdGhpcy5zZWN1cml0eUdyb3VwID0gbmV3IGVjMi5TZWN1cml0eUdyb3VwKHNjb3BlLCBpZCwge1xuICAgICAgICAvLyAgICAgZ3JvdXBOYW1lOiBwcm9wcy5ncm91cE5hbWUsXG4gICAgICAgIC8vICAgICB2cGM6IHByb3BzLnZwYyxcbiAgICAgICAgLy8gICAgIGRlc2NyaXB0aW9uOiAnQWxsb3cgc3NoIGFjY2VzcyB0byBlYzIgaW5zdGFuY2VzJyxcbiAgICAgICAgLy8gICAgIGFsbG93QWxsT3V0Ym91bmQ6IHRydWVcbiAgICAgICAgLy8gfSk7XG4gICAgICAgIC8vIHRoaXMuc2VjdXJpdHlHcm91cC5hZGRJbmdyZXNzUnVsZShuZXcgZWMyLkNpZHJJUHY0KGAke3Byb3BzLnByaW1hcnlCYXN0aW9uSVB9LzMyYCksIG5ldyBlYzIuVGNwUG9ydCgyMiksICdhbGxvdyBzc2ggYWNjZXNzIGZyb20gUHJpbWFyeSBCYXN0aW9uIFNlcnZlcicpO1xuICAgICAgICAvLyB0aGlzLnNlY3VyaXR5R3JvdXAuYWRkSW5ncmVzc1J1bGUobmV3IGVjMi5DaWRySVB2NChgJHtwcm9wcy5zZWNvbmRhcnlCYXN0aW9uSVB9LzMyYCksIG5ldyBlYzIuVGNwUG9ydCgyMiksICdhbGxvdyBzc2ggYWNjZXNzIGZyb20gU2Vjb25kYXJ5IEJhc3Rpb24gU2VydmVyJyk7XG4gICAgICAgIC8vIHRoaXMuc2VjdXJpdHlHcm91cC5jb25uZWN0aW9ucy5hZGRTZWN1cml0eUdyb3VwKHRoaXMucHJvcHMuYmFzdGlvblNlY3VyaXR5R3JvdXApO1xuICAgIH1cbn0iXX0=