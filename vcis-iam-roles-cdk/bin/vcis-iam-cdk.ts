#!/usr/bin/env node
import 'source-map-support/register';
import {VcisIamRolesCdkStack} from '../lib';
import {VcisApp} from "@monsantoit/vcis-cdk-utils";

const app = new VcisApp();

new VcisIamRolesCdkStack(app, 'vcis-iam-stack');

app.run();
