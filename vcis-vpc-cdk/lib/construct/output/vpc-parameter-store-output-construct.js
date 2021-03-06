"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ssm = require("@aws-cdk/aws-ssm");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
class VpcParameterStoreOutputConstruct {
    constructor(scope, props) {
        this.scope = scope;
        this.props = props;
        this.persistVpcId();
    }
    persistVpcId() {
        const vpcIdParamPath = (vcis_cdk_utils_1.InputParameterHolder.get('outputs'))['vpcIdParamStoreOutput'];
        new ssm.StringParameter(this.scope, 'vpcIdSsmParam', {
            description: vpcIdParamPath,
            name: vpcIdParamPath,
            stringValue: this.props.vpc.vpcId,
        });
    }
}
exports.VpcParameterStoreOutputConstruct = VpcParameterStoreOutputConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLXBhcmFtZXRlci1zdG9yZS1vdXRwdXQtY29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidnBjLXBhcmFtZXRlci1zdG9yZS1vdXRwdXQtY29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsd0NBQXlDO0FBQ3pDLCtEQUFrRTtBQVNsRSxNQUFhLGdDQUFnQztJQUV6QyxZQUE2QixLQUFnQixFQUFtQixLQUFtQztRQUF0RSxVQUFLLEdBQUwsS0FBSyxDQUFXO1FBQW1CLFVBQUssR0FBTCxLQUFLLENBQThCO1FBQy9GLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRU8sWUFBWTtRQUNoQixNQUFNLGNBQWMsR0FBRyxDQUFDLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFFdEYsSUFBSSxHQUFHLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsZUFBZSxFQUFFO1lBQ2pELFdBQVcsRUFBRSxjQUFjO1lBQzNCLElBQUksRUFBRSxjQUFjO1lBQ3BCLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLO1NBQ3BDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSjtBQWZELDRFQWVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0LCBDb25zdHJ1Y3ROb2RlIH0gZnJvbSBcIkBhd3MtY2RrL2Nka1wiO1xuaW1wb3J0IGVjMiA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2F3cy1lYzInKTtcbmltcG9ydCBzc20gPSByZXF1aXJlKCdAYXdzLWNkay9hd3Mtc3NtJyk7XG5pbXBvcnQgeyBJbnB1dFBhcmFtZXRlckhvbGRlciB9IGZyb20gXCJAbW9uc2FudG9pdC92Y2lzLWNkay11dGlsc1wiO1xuXG5leHBvcnQgaW50ZXJmYWNlIFZwY1BhcmFtZXRlclN0b3JlT3V0cHV0UHJvcHMge1xuICAgIHBhcmVudEFwcE5vZGU6IENvbnN0cnVjdE5vZGUsXG4gICAgdnBjOiBlYzIuVnBjTmV0d29yayxcbiAgICBzc2hTZWN1cml0eUdyb3VwOiBlYzIuQ2ZuU2VjdXJpdHlHcm91cCxcbiAgICByZHNTZWN1cml0eUdyb3VwOiBlYzIuQ2ZuU2VjdXJpdHlHcm91cFxufVxuXG5leHBvcnQgY2xhc3MgVnBjUGFyYW1ldGVyU3RvcmVPdXRwdXRDb25zdHJ1Y3Qge1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSByZWFkb25seSBzY29wZTogQ29uc3RydWN0LCBwcml2YXRlIHJlYWRvbmx5IHByb3BzOiBWcGNQYXJhbWV0ZXJTdG9yZU91dHB1dFByb3BzKSB7XG4gICAgICAgIHRoaXMucGVyc2lzdFZwY0lkKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBwZXJzaXN0VnBjSWQoKSB7XG4gICAgICAgIGNvbnN0IHZwY0lkUGFyYW1QYXRoID0gKElucHV0UGFyYW1ldGVySG9sZGVyLmdldCgnb3V0cHV0cycpKVsndnBjSWRQYXJhbVN0b3JlT3V0cHV0J107XG4gICAgICAgXG4gICAgICAgIG5ldyBzc20uU3RyaW5nUGFyYW1ldGVyKHRoaXMuc2NvcGUsICd2cGNJZFNzbVBhcmFtJywge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246IHZwY0lkUGFyYW1QYXRoLFxuICAgICAgICAgICAgbmFtZTogdnBjSWRQYXJhbVBhdGgsXG4gICAgICAgICAgICBzdHJpbmdWYWx1ZTogdGhpcy5wcm9wcy52cGMudnBjSWQsXG4gICAgICAgIH0pO1xuICAgIH1cbn0iXX0=