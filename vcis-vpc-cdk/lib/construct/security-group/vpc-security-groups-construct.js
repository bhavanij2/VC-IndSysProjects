"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vcis_ec2_instance_ssh_sg_construct_1 = require("./vcis-ec2-instance-ssh-sg-construct");
const vcis_rds_sg_construct_1 = require("./vcis-rds-sg-construct");
class VpcSecurityGroupsConstruct {
    constructor(stack, vpc, bastionSg) {
        this.sshSecurityGroup = this.createSSHSecurityGroup(stack, vpc, bastionSg);
        this.rdsSecurityGroup = this.createRdsSecurityGroup(stack, vpc, bastionSg);
    }
    createSSHSecurityGroup(stack, vpc, bastionSg) {
        return new vcis_ec2_instance_ssh_sg_construct_1.VcisEC2InstanceSshSGConstruct(stack, 'VcisSG', {
            stackName: stack.stackName,
            groupName: 'vcis-sg',
            vpc: vpc,
            bastionSecurityGroup: bastionSg
        }).securityGroup;
    }
    createRdsSecurityGroup(stack, vpc, bastionSg) {
        return new vcis_rds_sg_construct_1.VcisRdsSGConstruct(stack, 'VcisRdsSG', {
            stackName: stack.stackName,
            groupName: 'vcis-rds-sg',
            vpc: vpc,
            bastionSecurityGroup: bastionSg
        }).securityGroup;
    }
}
exports.VpcSecurityGroupsConstruct = VpcSecurityGroupsConstruct;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnBjLXNlY3VyaXR5LWdyb3Vwcy1jb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2cGMtc2VjdXJpdHktZ3JvdXBzLWNvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZGQUFxRjtBQUNyRixtRUFBNkQ7QUFFN0QsTUFBYSwwQkFBMEI7SUFJbkMsWUFBWSxLQUFZLEVBQUUsR0FBbUIsRUFBRSxTQUE0QjtRQUN2RSxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0UsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQy9FLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxLQUFZLEVBQUUsR0FBbUIsRUFBRSxTQUE0QjtRQUMxRixPQUFPLElBQUksa0VBQTZCLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRTtZQUN0RCxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7WUFDMUIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsR0FBRyxFQUFFLEdBQUc7WUFDUixvQkFBb0IsRUFBRSxTQUFTO1NBQ2xDLENBQUMsQ0FBQyxhQUFhLENBQUM7SUFDckIsQ0FBQztJQUVPLHNCQUFzQixDQUFDLEtBQVksRUFBRSxHQUFtQixFQUFFLFNBQTRCO1FBQzFGLE9BQU8sSUFBSSwwQ0FBa0IsQ0FBQyxLQUFLLEVBQUUsV0FBVyxFQUFFO1lBQzlDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztZQUMxQixTQUFTLEVBQUUsYUFBYTtZQUN4QixHQUFHLEVBQUUsR0FBRztZQUNSLG9CQUFvQixFQUFFLFNBQVM7U0FDbEMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztJQUNyQixDQUFDO0NBQ0o7QUExQkQsZ0VBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2sgfSBmcm9tIFwiQGF3cy1jZGsvY2RrXCI7XG5pbXBvcnQgZWMyID0gcmVxdWlyZSgnQGF3cy1jZGsvYXdzLWVjMicpO1xuaW1wb3J0IHsgVmNpc0VDMkluc3RhbmNlU3NoU0dDb25zdHJ1Y3QgfSBmcm9tIFwiLi92Y2lzLWVjMi1pbnN0YW5jZS1zc2gtc2ctY29uc3RydWN0XCI7XG5pbXBvcnQgeyBWY2lzUmRzU0dDb25zdHJ1Y3QgfSBmcm9tIFwiLi92Y2lzLXJkcy1zZy1jb25zdHJ1Y3RcIjtcblxuZXhwb3J0IGNsYXNzIFZwY1NlY3VyaXR5R3JvdXBzQ29uc3RydWN0IHtcbiAgICByZWFkb25seSBzc2hTZWN1cml0eUdyb3VwOiBlYzIuQ2ZuU2VjdXJpdHlHcm91cDtcbiAgICByZWFkb25seSByZHNTZWN1cml0eUdyb3VwOiBlYzIuQ2ZuU2VjdXJpdHlHcm91cDtcblxuICAgIGNvbnN0cnVjdG9yKHN0YWNrOiBTdGFjaywgdnBjOiBlYzIuVnBjTmV0d29yaywgYmFzdGlvblNnOiBlYzIuU2VjdXJpdHlHcm91cCkge1xuICAgICAgICB0aGlzLnNzaFNlY3VyaXR5R3JvdXAgPSB0aGlzLmNyZWF0ZVNTSFNlY3VyaXR5R3JvdXAoc3RhY2ssIHZwYywgYmFzdGlvblNnKTtcbiAgICAgICAgdGhpcy5yZHNTZWN1cml0eUdyb3VwID0gdGhpcy5jcmVhdGVSZHNTZWN1cml0eUdyb3VwKHN0YWNrLCB2cGMsIGJhc3Rpb25TZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjcmVhdGVTU0hTZWN1cml0eUdyb3VwKHN0YWNrOiBTdGFjaywgdnBjOiBlYzIuVnBjTmV0d29yaywgYmFzdGlvblNnOiBlYzIuU2VjdXJpdHlHcm91cCk6IGVjMi5DZm5TZWN1cml0eUdyb3VwIHtcbiAgICAgICAgcmV0dXJuIG5ldyBWY2lzRUMySW5zdGFuY2VTc2hTR0NvbnN0cnVjdChzdGFjaywgJ1ZjaXNTRycsIHtcbiAgICAgICAgICAgIHN0YWNrTmFtZTogc3RhY2suc3RhY2tOYW1lLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAndmNpcy1zZycsXG4gICAgICAgICAgICB2cGM6IHZwYyxcbiAgICAgICAgICAgIGJhc3Rpb25TZWN1cml0eUdyb3VwOiBiYXN0aW9uU2dcbiAgICAgICAgfSkuc2VjdXJpdHlHcm91cDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNyZWF0ZVJkc1NlY3VyaXR5R3JvdXAoc3RhY2s6IFN0YWNrLCB2cGM6IGVjMi5WcGNOZXR3b3JrLCBiYXN0aW9uU2c6IGVjMi5TZWN1cml0eUdyb3VwKTogZWMyLkNmblNlY3VyaXR5R3JvdXAge1xuICAgICAgICByZXR1cm4gbmV3IFZjaXNSZHNTR0NvbnN0cnVjdChzdGFjaywgJ1ZjaXNSZHNTRycsIHtcbiAgICAgICAgICAgIHN0YWNrTmFtZTogc3RhY2suc3RhY2tOYW1lLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAndmNpcy1yZHMtc2cnLFxuICAgICAgICAgICAgdnBjOiB2cGMsXG4gICAgICAgICAgICBiYXN0aW9uU2VjdXJpdHlHcm91cDogYmFzdGlvblNnXG4gICAgICAgIH0pLnNlY3VyaXR5R3JvdXA7XG4gICAgfVxufSJdfQ==