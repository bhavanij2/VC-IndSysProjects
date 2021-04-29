"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk_1 = require("@aws-cdk/cdk");
class PublicSubnetOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.createPublicSubnet1IdOutput();
        // Output - PublicSubnet1CIDR??
        this.createPublicSubnet2IdOutput();
        // Output - PublicSubnet2CIDR??
    }
    createPublicSubnet1IdOutput() {
        new cdk_1.CfnOutput(this.scope, 'PublicSubnet1Output', {
            description: 'PublicSubnet1',
            value: this.props.vpc.publicSubnets[0].subnetId,
            export: `${this.props.stackName}-PublicSubnet1`
        })
            .makeImportValue()
            .toString();
    }
    createPublicSubnet2IdOutput() {
        new cdk_1.CfnOutput(this.scope, 'PublicSubnet2Output', {
            description: 'PublicSubnet2',
            value: this.props.vpc.publicSubnets[1].subnetId,
            export: `${this.props.stackName}-PublicSubnet2`
        })
            .makeImportValue()
            .toString();
    }
}
exports.PublicSubnetOutputConstruct = PublicSubnetOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLXN1Ym5ldC1vdXRwdXQtY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHVibGljLXN1Ym5ldC1vdXRwdXQtY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQW9EO0FBR3BELE1BQWEsMkJBQTJCO0lBRXBDLFlBQTZCLEtBQWdCLEVBQVUsS0FBeUI7UUFBbkQsVUFBSyxHQUFMLEtBQUssQ0FBVztRQUFVLFVBQUssR0FBTCxLQUFLLENBQW9CO1FBRTVFLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1FBQ25DLCtCQUErQjtRQUMvQixJQUFJLENBQUMsMkJBQTJCLEVBQUUsQ0FBQztRQUNuQywrQkFBK0I7SUFDbkMsQ0FBQztJQUVPLDJCQUEyQjtRQUMvQixJQUFJLGVBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFO1lBQzdDLFdBQVcsRUFBRSxlQUFlO1lBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUMvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsZ0JBQWdCO1NBQ2xELENBQUM7YUFDRyxlQUFlLEVBQUU7YUFDakIsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUVPLDJCQUEyQjtRQUMvQixJQUFJLGVBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLHFCQUFxQixFQUFFO1lBQzdDLFdBQVcsRUFBRSxlQUFlO1lBQzVCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUMvQyxNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsZ0JBQWdCO1NBQ2xELENBQUM7YUFDRyxlQUFlLEVBQUU7YUFDakIsUUFBUSxFQUFFLENBQUM7SUFDcEIsQ0FBQztDQUNKO0FBN0JELGtFQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENmbk91dHB1dCwgQ29uc3RydWN0IH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IHsgVmNpc1ZwY091dHB1dFByb3BzIH0gZnJvbSBcIi4vdmNpcy12cGMtb3V0cHV0LWNvbnN0cnVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUHVibGljU3VibmV0T3V0cHV0Q29uc3RydWN0IHtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2NvcGU6IENvbnN0cnVjdCwgcHJpdmF0ZSBwcm9wczogVmNpc1ZwY091dHB1dFByb3BzKSB7XG5cbiAgICAgICAgdGhpcy5jcmVhdGVQdWJsaWNTdWJuZXQxSWRPdXRwdXQoKTtcbiAgICAgICAgLy8gT3V0cHV0IC0gUHVibGljU3VibmV0MUNJRFI/P1xuICAgICAgICB0aGlzLmNyZWF0ZVB1YmxpY1N1Ym5ldDJJZE91dHB1dCgpO1xuICAgICAgICAvLyBPdXRwdXQgLSBQdWJsaWNTdWJuZXQyQ0lEUj8/XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVQdWJsaWNTdWJuZXQxSWRPdXRwdXQoKSB7XG4gICAgICAgIG5ldyBDZm5PdXRwdXQodGhpcy5zY29wZSwgJ1B1YmxpY1N1Ym5ldDFPdXRwdXQnLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1B1YmxpY1N1Ym5ldDEnLFxuICAgICAgICAgICAgdmFsdWU6IHRoaXMucHJvcHMudnBjLnB1YmxpY1N1Ym5ldHNbMF0uc3VibmV0SWQsXG4gICAgICAgICAgICBleHBvcnQ6IGAke3RoaXMucHJvcHMuc3RhY2tOYW1lfS1QdWJsaWNTdWJuZXQxYFxuICAgICAgICB9KVxuICAgICAgICAgICAgLm1ha2VJbXBvcnRWYWx1ZSgpXG4gICAgICAgICAgICAudG9TdHJpbmcoKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVB1YmxpY1N1Ym5ldDJJZE91dHB1dCgpIHtcbiAgICAgICAgbmV3IENmbk91dHB1dCh0aGlzLnNjb3BlLCAnUHVibGljU3VibmV0Mk91dHB1dCcsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnUHVibGljU3VibmV0MicsXG4gICAgICAgICAgICB2YWx1ZTogdGhpcy5wcm9wcy52cGMucHVibGljU3VibmV0c1sxXS5zdWJuZXRJZCxcbiAgICAgICAgICAgIGV4cG9ydDogYCR7dGhpcy5wcm9wcy5zdGFja05hbWV9LVB1YmxpY1N1Ym5ldDJgXG4gICAgICAgIH0pXG4gICAgICAgICAgICAubWFrZUltcG9ydFZhbHVlKClcbiAgICAgICAgICAgIC50b1N0cmluZygpO1xuICAgIH1cbn0iXX0=