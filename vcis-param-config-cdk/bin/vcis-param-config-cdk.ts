#!/usr/bin/env node
import 'source-map-support/register';
import { VcisParamConfigStack } from '../lib/vcis-param-config-stack';
import { VcisApp, InputParameterHolder } from '@monsantoit/vcis-cdk-utils';

const app = new VcisApp();
InputParameterHolder.setup(app.node, false).then(() =>{
    new VcisParamConfigStack(app, 'vcis-param-config-stack');
    app.run();
}
).catch((error:any) => {
    console.error(error);
});
