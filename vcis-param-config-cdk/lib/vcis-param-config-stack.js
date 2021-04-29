"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const vcis_cdk_utils_1 = require("@monsantoit/vcis-cdk-utils");
const tag_param_config_construct_1 = require("./tags/tag-param-config-construct");
const vpc_param_config_construct_1 = require("./vpc-config/vpc-param-config-construct");
class VcisParamConfigStack extends cdk.Stack {
    constructor(app, id, props) {
        const stackName = `${id}-${vcis_cdk_utils_1.EnvironmentHolder.getEnv()}`;
        super(app, stackName, props);
        this.configureTagParams();
        this.configureVpcParams();
    }
    configureTagParams() {
        new tag_param_config_construct_1.TagParamConfigConstruct(this, 'tag-param-config-construct');
    }
    configureVpcParams() {
        new vpc_param_config_construct_1.VpcParamConfigConstruct(this, 'vpc-param-config-construct');
    }
}
exports.VcisParamConfigStack = VcisParamConfigStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmNpcy1wYXJhbS1jb25maWctc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2Y2lzLXBhcmFtLWNvbmZpZy1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLG9DQUFxQztBQUNyQywrREFBd0U7QUFDeEUsa0ZBQTRFO0FBQzVFLHdGQUFrRjtBQUVsRixNQUFhLG9CQUFxQixTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBQ2pELFlBQVksR0FBWSxFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUMxRCxNQUFNLFNBQVMsR0FBRyxHQUFHLEVBQUUsSUFBSSxrQ0FBaUIsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFBO1FBQ3ZELEtBQUssQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsSUFBSSxvREFBdUIsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQztJQUNsRSxDQUFDO0lBRU8sa0JBQWtCO1FBQ3hCLElBQUksb0RBQXVCLENBQUMsSUFBSSxFQUFFLDRCQUE0QixDQUFDLENBQUM7SUFDbEUsQ0FBQztDQUNGO0FBZkQsb0RBZUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY2RrJyk7XG5pbXBvcnQgeyBWY2lzQXBwLCBFbnZpcm9ubWVudEhvbGRlciB9IGZyb20gJ0Btb25zYW50b2l0L3ZjaXMtY2RrLXV0aWxzJztcbmltcG9ydCB7IFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0IH0gZnJvbSAnLi90YWdzL3RhZy1wYXJhbS1jb25maWctY29uc3RydWN0JztcbmltcG9ydCB7IFZwY1BhcmFtQ29uZmlnQ29uc3RydWN0IH0gZnJvbSAnLi92cGMtY29uZmlnL3ZwYy1wYXJhbS1jb25maWctY29uc3RydWN0JztcblxuZXhwb3J0IGNsYXNzIFZjaXNQYXJhbUNvbmZpZ1N0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3IoYXBwOiBWY2lzQXBwLCBpZDogc3RyaW5nLCBwcm9wcz86IGNkay5TdGFja1Byb3BzKSB7XG4gICAgY29uc3Qgc3RhY2tOYW1lID0gYCR7aWR9LSR7RW52aXJvbm1lbnRIb2xkZXIuZ2V0RW52KCl9YFxuICAgIHN1cGVyKGFwcCwgc3RhY2tOYW1lLCBwcm9wcyk7XG4gICAgdGhpcy5jb25maWd1cmVUYWdQYXJhbXMoKTtcbiAgICB0aGlzLmNvbmZpZ3VyZVZwY1BhcmFtcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVUYWdQYXJhbXMoKSB7XG4gICAgbmV3IFRhZ1BhcmFtQ29uZmlnQ29uc3RydWN0KHRoaXMsICd0YWctcGFyYW0tY29uZmlnLWNvbnN0cnVjdCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBjb25maWd1cmVWcGNQYXJhbXMoKSB7XG4gICAgbmV3IFZwY1BhcmFtQ29uZmlnQ29uc3RydWN0KHRoaXMsICd2cGMtcGFyYW0tY29uZmlnLWNvbnN0cnVjdCcpO1xuICB9XG59XG4iXX0=