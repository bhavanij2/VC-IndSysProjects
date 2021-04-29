"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const cdk_1 = require("@aws-cdk/cdk");
const amilookup_custom_resource_1 = require("../../custom-resource/amilookup-custom-resource");
const ec2 = require("@aws-cdk/aws-ec2");
class BastionInstanceConstruct {
    constructor(scope, id, props) {
        this.scope = scope;
        this.id = id;
        this.props = props;
        this.getAmi = (region, accountId) => {
            return new amilookup_custom_resource_1.AmiLookupCustomResource(this.scope, `${this.id}-AMILookup`, {
                serviceToken: `arn:aws:lambda:${region}:${accountId}:function:FindCurrentAmi`,
                amiNamePrefix: "mon-amzn-2",
                region: region
            });
        };
        this.getBastionInstanceUserData = (isPrimaryInstance) => isPrimaryInstance
            ? this.getPrimaryInstanceUserData()
            : this.getSecondaryInstanceUserData();
        this.validateStackInputParams();
        this.securityGroup = props.securityGroup;
        const ami = this.getAmi(props.region, props.accountId);
        this.instance = new ec2.CfnInstance(scope, id, {
            imageId: ami.getAtt('Id').toString(),
            userData: cdk_1.Fn.base64(this.getBastionInstanceUserData(props.isPrimary)),
            keyName: props.hostKeyName,
            securityGroupIds: [props.securityGroup.securityGroupId],
            instanceType: props.instanceType,
            subnetId: props.subnet.subnetId,
        });
        this.instance.node.apply(new cdk.Tag('Name', `${props.stackName}/${id}`));
        // CfnEIP Resource doesn't support tags currently
        this.instanceEIP = new ec2.CfnEIP(scope, `${id}EIP`, {
            domain: 'vpc',
            instanceId: this.instance.instanceId
        });
    }
    validateStackInputParams() {
        if (!this.props.hostKeyName) {
            throw new Error('Error: Bastion Host Key Name Input Parameter is required.');
        }
        if (!this.props.instanceType) {
            throw new Error('Error: Bastion Instance Type Input Parameter is required.');
        }
    }
    getSecondaryInstanceUserData() {
        return `
    #!/bin/bash -v
    yum update -y --security
    yum update -y aws*
    echo #!/bin/sh > /etc/cron.daily/yum-security.cron
    echo "yum -y update yum" >> /etc/cron.daily/yum-security.cron
    echo "yum --security -y update" >> /etc/cron.daily/yum-security.cron
    chmod +x /etc/cron.daily/yum-security.cron
    shutdown -P now
    # EOF
    `;
    }
    getPrimaryInstanceUserData() {
        return `
    #!/bin/bash -v
    yum update -y --security
    yum update -y aws*
    echo #!/bin/sh > /etc/cron.daily/yum-security.cron
    echo "yum -y update yum" >> /etc/cron.daily/yum-security.cron
    echo "yum --security -y update" >> /etc/cron.daily/yum-security.cron
    chmod +x /etc/cron.daily/yum-security.cron
    # EOF
    `;
    }
}
exports.BastionInstanceConstruct = BastionInstanceConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzdGlvbi1pbnN0YW5jZS1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYXN0aW9uLWluc3RhbmNlLWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFxQztBQUNyQyxzQ0FBNkM7QUFDN0MsK0ZBQTBGO0FBQzFGLHdDQUF5QztBQWF6QyxNQUFhLHdCQUF3QjtJQUtqQyxZQUE2QixLQUFnQixFQUFtQixFQUFVLEVBQW1CLEtBQXFDO1FBQXJHLFVBQUssR0FBTCxLQUFLLENBQVc7UUFBbUIsT0FBRSxHQUFGLEVBQUUsQ0FBUTtRQUFtQixVQUFLLEdBQUwsS0FBSyxDQUFnQztRQXNCMUgsV0FBTSxHQUFHLENBQUMsTUFBYyxFQUFFLFNBQWlCLEVBQUUsRUFBRTtZQUNuRCxPQUFPLElBQUksbURBQXVCLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLFlBQVksRUFBRTtnQkFDbkUsWUFBWSxFQUFFLGtCQUFrQixNQUFNLElBQUksU0FBUywwQkFBMEI7Z0JBQzdFLGFBQWEsRUFBRSxZQUFZO2dCQUMzQixNQUFNLEVBQUUsTUFBTTthQUNqQixDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUFFTywrQkFBMEIsR0FBRyxDQUFDLGlCQUEwQixFQUFFLEVBQUUsQ0FDaEUsaUJBQWlCO1lBQ2IsQ0FBQyxDQUFDLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNuQyxDQUFDLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUM7UUFoQzFDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBRWhDLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQztRQUN6QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUU7WUFDM0MsT0FBTyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFO1lBQ3BDLFFBQVEsRUFBRSxRQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQywwQkFBMEIsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDckUsT0FBTyxFQUFFLEtBQUssQ0FBQyxXQUFXO1lBQzFCLGdCQUFnQixFQUFFLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUM7WUFDdkQsWUFBWSxFQUFFLEtBQUssQ0FBQyxZQUFZO1lBQ2hDLFFBQVEsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQVE7U0FDbEMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsR0FBRyxLQUFLLENBQUMsU0FBUyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUUxRSxpREFBaUQ7UUFDakQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7WUFDakQsTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1NBQ3ZDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFnQk8sd0JBQXdCO1FBQzVCLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUN6QixNQUFNLElBQUksS0FBSyxDQUFDLDJEQUEyRCxDQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7WUFDMUIsTUFBTSxJQUFJLEtBQUssQ0FBQywyREFBMkQsQ0FBQyxDQUFDO1NBQ2hGO0lBQ0wsQ0FBQztJQUVPLDRCQUE0QjtRQUNoQyxPQUFPOzs7Ozs7Ozs7O0tBVVYsQ0FBQztJQUNGLENBQUM7SUFFTywwQkFBMEI7UUFDOUIsT0FBTzs7Ozs7Ozs7O0tBU1YsQ0FBQztJQUNGLENBQUM7Q0FDSjtBQTVFRCw0REE0RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZShcIkBhd3MtY2RrL2Nka1wiKTtcbmltcG9ydCB7IENvbnN0cnVjdCwgRm4gfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQgeyBBbWlMb29rdXBDdXN0b21SZXNvdXJjZSB9IGZyb20gXCIuLi8uLi9jdXN0b20tcmVzb3VyY2UvYW1pbG9va3VwLWN1c3RvbS1yZXNvdXJjZVwiO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoXCJAYXdzLWNkay9hd3MtZWMyXCIpO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJhc3Rpb25JbnN0YW5jZUlucHV0UHJvcGVydGllcyB7XG4gICAgc3RhY2tOYW1lOiBzdHJpbmcsXG4gICAgcmVnaW9uOiBzdHJpbmcsXG4gICAgYWNjb3VudElkOiBzdHJpbmcsXG4gICAgaW5zdGFuY2VUeXBlOiBzdHJpbmcsXG4gICAgc3VibmV0OiBlYzIuSVZwY1N1Ym5ldCxcbiAgICBzZWN1cml0eUdyb3VwOiBlYzIuU2VjdXJpdHlHcm91cDtcbiAgICBob3N0S2V5TmFtZTogc3RyaW5nLFxuICAgIGlzUHJpbWFyeTogYm9vbGVhbixcbn1cblxuZXhwb3J0IGNsYXNzIEJhc3Rpb25JbnN0YW5jZUNvbnN0cnVjdCB7XG4gICAgcmVhZG9ubHkgc2VjdXJpdHlHcm91cDogZWMyLlNlY3VyaXR5R3JvdXA7XG4gICAgcmVhZG9ubHkgaW5zdGFuY2U6IGVjMi5DZm5JbnN0YW5jZTtcbiAgICByZWFkb25seSBpbnN0YW5jZUVJUDogZWMyLkNmbkVJUDtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IENvbnN0cnVjdCwgcHJpdmF0ZSByZWFkb25seSBpZDogc3RyaW5nLCBwcml2YXRlIHJlYWRvbmx5IHByb3BzOiBCYXN0aW9uSW5zdGFuY2VJbnB1dFByb3BlcnRpZXMpIHtcbiAgICAgICAgdGhpcy52YWxpZGF0ZVN0YWNrSW5wdXRQYXJhbXMoKTtcblxuICAgICAgICB0aGlzLnNlY3VyaXR5R3JvdXAgPSBwcm9wcy5zZWN1cml0eUdyb3VwO1xuICAgICAgICBjb25zdCBhbWkgPSB0aGlzLmdldEFtaShwcm9wcy5yZWdpb24sIHByb3BzLmFjY291bnRJZCk7XG4gICAgICAgIHRoaXMuaW5zdGFuY2UgPSBuZXcgZWMyLkNmbkluc3RhbmNlKHNjb3BlLCBpZCwge1xuICAgICAgICAgICAgaW1hZ2VJZDogYW1pLmdldEF0dCgnSWQnKS50b1N0cmluZygpLFxuICAgICAgICAgICAgdXNlckRhdGE6IEZuLmJhc2U2NCh0aGlzLmdldEJhc3Rpb25JbnN0YW5jZVVzZXJEYXRhKHByb3BzLmlzUHJpbWFyeSkpLFxuICAgICAgICAgICAga2V5TmFtZTogcHJvcHMuaG9zdEtleU5hbWUsXG4gICAgICAgICAgICBzZWN1cml0eUdyb3VwSWRzOiBbcHJvcHMuc2VjdXJpdHlHcm91cC5zZWN1cml0eUdyb3VwSWRdLFxuICAgICAgICAgICAgaW5zdGFuY2VUeXBlOiBwcm9wcy5pbnN0YW5jZVR5cGUsXG4gICAgICAgICAgICBzdWJuZXRJZDogcHJvcHMuc3VibmV0LnN1Ym5ldElkLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5ub2RlLmFwcGx5KG5ldyBjZGsuVGFnKCdOYW1lJywgYCR7cHJvcHMuc3RhY2tOYW1lfS8ke2lkfWApKTtcblxuICAgICAgICAvLyBDZm5FSVAgUmVzb3VyY2UgZG9lc24ndCBzdXBwb3J0IHRhZ3MgY3VycmVudGx5XG4gICAgICAgIHRoaXMuaW5zdGFuY2VFSVAgPSBuZXcgZWMyLkNmbkVJUChzY29wZSwgYCR7aWR9RUlQYCwge1xuICAgICAgICAgICAgZG9tYWluOiAndnBjJyxcbiAgICAgICAgICAgIGluc3RhbmNlSWQ6IHRoaXMuaW5zdGFuY2UuaW5zdGFuY2VJZFxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEFtaSA9IChyZWdpb246IHN0cmluZywgYWNjb3VudElkOiBzdHJpbmcpID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBBbWlMb29rdXBDdXN0b21SZXNvdXJjZSh0aGlzLnNjb3BlLCBgJHt0aGlzLmlkfS1BTUlMb29rdXBgLCB7XG4gICAgICAgICAgICBzZXJ2aWNlVG9rZW46IGBhcm46YXdzOmxhbWJkYToke3JlZ2lvbn06JHthY2NvdW50SWR9OmZ1bmN0aW9uOkZpbmRDdXJyZW50QW1pYCxcbiAgICAgICAgICAgIGFtaU5hbWVQcmVmaXg6IFwibW9uLWFtem4tMlwiLFxuICAgICAgICAgICAgcmVnaW9uOiByZWdpb25cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCYXN0aW9uSW5zdGFuY2VVc2VyRGF0YSA9IChpc1ByaW1hcnlJbnN0YW5jZTogYm9vbGVhbikgPT5cbiAgICAgICAgaXNQcmltYXJ5SW5zdGFuY2VcbiAgICAgICAgICAgID8gdGhpcy5nZXRQcmltYXJ5SW5zdGFuY2VVc2VyRGF0YSgpXG4gICAgICAgICAgICA6IHRoaXMuZ2V0U2Vjb25kYXJ5SW5zdGFuY2VVc2VyRGF0YSgpO1xuXG5cbiAgICBwcml2YXRlIHZhbGlkYXRlU3RhY2tJbnB1dFBhcmFtcygpIHtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLmhvc3RLZXlOYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Vycm9yOiBCYXN0aW9uIEhvc3QgS2V5IE5hbWUgSW5wdXQgUGFyYW1ldGVyIGlzIHJlcXVpcmVkLicpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5wcm9wcy5pbnN0YW5jZVR5cGUpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3I6IEJhc3Rpb24gSW5zdGFuY2UgVHlwZSBJbnB1dCBQYXJhbWV0ZXIgaXMgcmVxdWlyZWQuJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFNlY29uZGFyeUluc3RhbmNlVXNlckRhdGEoKSB7XG4gICAgICAgIHJldHVybiBgXG4gICAgIyEvYmluL2Jhc2ggLXZcbiAgICB5dW0gdXBkYXRlIC15IC0tc2VjdXJpdHlcbiAgICB5dW0gdXBkYXRlIC15IGF3cypcbiAgICBlY2hvICMhL2Jpbi9zaCA+IC9ldGMvY3Jvbi5kYWlseS95dW0tc2VjdXJpdHkuY3JvblxuICAgIGVjaG8gXCJ5dW0gLXkgdXBkYXRlIHl1bVwiID4+IC9ldGMvY3Jvbi5kYWlseS95dW0tc2VjdXJpdHkuY3JvblxuICAgIGVjaG8gXCJ5dW0gLS1zZWN1cml0eSAteSB1cGRhdGVcIiA+PiAvZXRjL2Nyb24uZGFpbHkveXVtLXNlY3VyaXR5LmNyb25cbiAgICBjaG1vZCAreCAvZXRjL2Nyb24uZGFpbHkveXVtLXNlY3VyaXR5LmNyb25cbiAgICBzaHV0ZG93biAtUCBub3dcbiAgICAjIEVPRlxuICAgIGA7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQcmltYXJ5SW5zdGFuY2VVc2VyRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAjIS9iaW4vYmFzaCAtdlxuICAgIHl1bSB1cGRhdGUgLXkgLS1zZWN1cml0eVxuICAgIHl1bSB1cGRhdGUgLXkgYXdzKlxuICAgIGVjaG8gIyEvYmluL3NoID4gL2V0Yy9jcm9uLmRhaWx5L3l1bS1zZWN1cml0eS5jcm9uXG4gICAgZWNobyBcInl1bSAteSB1cGRhdGUgeXVtXCIgPj4gL2V0Yy9jcm9uLmRhaWx5L3l1bS1zZWN1cml0eS5jcm9uXG4gICAgZWNobyBcInl1bSAtLXNlY3VyaXR5IC15IHVwZGF0ZVwiID4+IC9ldGMvY3Jvbi5kYWlseS95dW0tc2VjdXJpdHkuY3JvblxuICAgIGNobW9kICt4IC9ldGMvY3Jvbi5kYWlseS95dW0tc2VjdXJpdHkuY3JvblxuICAgICMgRU9GXG4gICAgYDtcbiAgICB9XG59Il19