"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const __1 = require("..");
const EnvironmentHolder_1 = require("../holder/EnvironmentHolder");
class VcisStack extends cdk.Stack {
    constructor(scope, id, props) {
        const stackName = `${id}-${EnvironmentHolder_1.EnvironmentHolder.getEnv()}`;
        super(scope, stackName, props);
        __1.Tagger.setup();
        __1.Tagger.apply(scope.node);
    }
    getOutput() {
        return this.output;
    }
}
exports.VcisStack = VcisStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmNpc1N0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVmNpc1N0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQXFDO0FBQ3JDLDBCQUFtQztBQUNuQyxtRUFBZ0U7QUFHaEUsTUFBYSxTQUF3QyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBSWxFLFlBQVksS0FBYyxFQUFFLEVBQVUsRUFBRSxLQUFTO1FBQzdDLE1BQU0sU0FBUyxHQUFHLEdBQUcsRUFBRSxJQUFJLHFDQUFpQixDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUE7UUFDdkQsS0FBSyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0IsVUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2YsVUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVM7UUFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDdkIsQ0FBQztDQUNKO0FBZEQsOEJBY0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY2RrID0gcmVxdWlyZSgnQGF3cy1jZGsvY2RrJyk7XG5pbXBvcnQge1ZjaXNBcHAsIFRhZ2dlcn0gZnJvbSBcIi4uXCI7XG5pbXBvcnQgeyBFbnZpcm9ubWVudEhvbGRlciB9IGZyb20gXCIuLi9ob2xkZXIvRW52aXJvbm1lbnRIb2xkZXJcIjtcblxuXG5leHBvcnQgY2xhc3MgVmNpc1N0YWNrPEkgZXh0ZW5kcyBjZGsuU3RhY2tQcm9wcywgTyA+IGV4dGVuZHMgY2RrLlN0YWNrIHtcblxuICAgIHByb3RlY3RlZCBvdXRwdXQ6IE87XG5cbiAgICBjb25zdHJ1Y3RvcihzY29wZTogVmNpc0FwcCwgaWQ6IHN0cmluZywgcHJvcHM/OiBJKSB7XG4gICAgICAgIGNvbnN0IHN0YWNrTmFtZSA9IGAke2lkfS0ke0Vudmlyb25tZW50SG9sZGVyLmdldEVudigpfWBcbiAgICAgICAgc3VwZXIoc2NvcGUsIHN0YWNrTmFtZSwgcHJvcHMpO1xuICAgICAgICBUYWdnZXIuc2V0dXAoKTtcbiAgICAgICAgVGFnZ2VyLmFwcGx5KHNjb3BlLm5vZGUpO1xuICAgIH1cblxuICAgIGdldE91dHB1dCgpOiBPIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3V0cHV0O1xuICAgIH1cbn1cbiJdfQ==