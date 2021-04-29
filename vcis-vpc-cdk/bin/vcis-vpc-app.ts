#!/usr/bin/env node
import { VcisApp, InputParameterHolder } from '@monsantoit/vcis-cdk-utils';
import 'source-map-support/register';
import { VcisVpcStack } from '../lib/vcis-vpc-stack';

const app = new VcisApp();

InputParameterHolder.setup(app.node).then(()=>{
    new VcisVpcStack(app, 'vcis-vpc-stack');
    app.run();
}).catch(error => {
    console.error(error);
})
