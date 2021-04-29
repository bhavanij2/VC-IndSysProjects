import cdk = require('@aws-cdk/cdk');
//import {Tagger} from "..";
import {EnvironmentHolder} from "../holder/EnvironmentHolder";
export class VcisApp extends cdk.App {

    constructor() {
        super();
        EnvironmentHolder.setup(this.node);
    }
}
