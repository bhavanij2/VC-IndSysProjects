"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
class AvailabilityZoneOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.createAZ1Output();
        this.createAZ2Output();
    }
    createAZ1Output() {
        new cdk_1.CfnOutput(this.scope, 'AvailabilityZone1Output', {
            description: 'AvailabilityZone1',
            value: this.props.vpc.availabilityZones[0],
            export: `${this.props.stackName}-AvailabilityZone1`
        })
            .makeImportValue()
            .toString();
    }
    createAZ2Output() {
        new cdk_1.CfnOutput(this.scope, 'AvailabilityZone2Output', {
            description: 'AvailabilityZone2',
            value: this.props.vpc.availabilityZones[1],
            export: `${this.props.stackName}-AvailabilityZone2`
        })
            .makeImportValue()
            .toString();
    }
}
exports.AvailabilityZoneOutputConstruct = AvailabilityZoneOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhaWxhYmlsaXR5LXpvbmUtb3V0cHV0LWNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImF2YWlsYWJpbGl0eS16b25lLW91dHB1dC1jb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxzQ0FBb0Q7QUFHcEQsTUFBYSwrQkFBK0I7SUFFeEMsWUFBNkIsS0FBZ0IsRUFBVSxLQUF5QjtRQUFuRCxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBb0I7UUFDNUUsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sZUFBZTtRQUNuQixJQUFJLGVBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHlCQUF5QixFQUFFO1lBQ2pELFdBQVcsRUFBRSxtQkFBbUI7WUFDaEMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztZQUMxQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsb0JBQW9CO1NBQ3RELENBQUM7YUFDRyxlQUFlLEVBQUU7YUFDakIsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLGVBQWU7UUFDbkIsSUFBSSxlQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSx5QkFBeUIsRUFBRTtZQUNqRCxXQUFXLEVBQUUsbUJBQW1CO1lBQ2hDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7WUFDMUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLG9CQUFvQjtTQUN0RCxDQUFDO2FBQ0csZUFBZSxFQUFFO2FBQ2pCLFFBQVEsRUFBRSxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQTFCRCwwRUEwQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDZm5PdXRwdXQsIENvbnN0cnVjdCB9IGZyb20gXCJAYXdzLWNkay9jZGtcIjtcbmltcG9ydCB7IFZjaXNWcGNPdXRwdXRQcm9wcyB9IGZyb20gXCIuL3ZjaXMtdnBjLW91dHB1dC1jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIEF2YWlsYWJpbGl0eVpvbmVPdXRwdXRDb25zdHJ1Y3Qge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0LCBwcml2YXRlIHByb3BzOiBWY2lzVnBjT3V0cHV0UHJvcHMpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVBWjFPdXRwdXQoKTtcbiAgICAgICAgdGhpcy5jcmVhdGVBWjJPdXRwdXQoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUFaMU91dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnQXZhaWxhYmlsaXR5Wm9uZTFPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0F2YWlsYWJpbGl0eVpvbmUxJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZwYy5hdmFpbGFiaWxpdHlab25lc1swXSxcbiAgICAgICAgICAgIGV4cG9ydDogYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LUF2YWlsYWJpbGl0eVpvbmUxYFxuICAgICAgICB9KVxuICAgICAgICAgICAgLm1ha2VJbXBvcnRWYWx1ZSgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZUFaMk91dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnQXZhaWxhYmlsaXR5Wm9uZTJPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0F2YWlsYWJpbGl0eVpvbmUyJyxcbiAgICAgICAgICAgIHZhbHVlOiB0aGlzLnByb3BzLnZwYy5hdmFpbGFiaWxpdHlab25lc1sxXSxcbiAgICAgICAgICAgIGV4cG9ydDogYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LUF2YWlsYWJpbGl0eVpvbmUyYFxuICAgICAgICB9KVxuICAgICAgICAgICAgLm1ha2VJbXBvcnRWYWx1ZSgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICB9XG59Il19