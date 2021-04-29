#!/usr/bin/env node
import 'source-map-support/register';
import {VcisIamRolesCdkStack} from '@monsantoit/vcis-iam-roles-cdk';
import {VcisApp} from "@monsantoit/vcis-cdk-utils";
import { VcisVpcStack} from '@monsantoit/vcis-vpc-cdk';

const app = new VcisApp();

const vcisIamRolesCdkStack = new VcisIamRolesCdkStack(app, 'vcis-iam-roles-stack');
const vcisVpcStack = new VcisVpcStack(app, 'vcis-vpc-stack');

console.log(vcisIamRolesCdkStack.getOutput().lambdaRole);
console.log(vcisVpcStack.getOutput());

app.run();
