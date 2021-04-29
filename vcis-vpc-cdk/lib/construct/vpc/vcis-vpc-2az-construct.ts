import { Stack } from "@aws-cdk/cdk";
import { VcisVpcConstruct } from "./vcis-vpc-construct";
import { InputParameterHolder } from "@monsantoit/vcis-cdk-utils";

export class VcisVpc2AzConstruct {

    createVpc(stack: Stack) {
        const vpcCidr = InputParameterHolder.get('inputs').vpcCidrList;
        const vcisVpcConstruct = new VcisVpcConstruct(stack, 'vcis-vpc', {
            vpcCidr: vpcCidr
        });
        return vcisVpcConstruct.vpc;
    }
}