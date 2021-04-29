import cdk = require('@aws-cdk/cdk');
import {VcisApp, Tagger} from "..";
import { EnvironmentHolder } from "../holder/EnvironmentHolder";


export class VcisStack<I extends cdk.StackProps, O > extends cdk.Stack {

    protected output: O;

    constructor(scope: VcisApp, id: string, props?: I) {
        const stackName = `${id}-${EnvironmentHolder.getEnv()}`
        super(scope, stackName, props);
        Tagger.setup();
        Tagger.apply(scope.node);
    }

    getOutput(): O {
        return this.output;
    }
}
