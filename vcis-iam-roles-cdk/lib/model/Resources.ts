import {InlinePolicies} from "../policies/InlinePolicies";

export class Resources {

    static inlinePolicies = InlinePolicies;

    static LAMBDA_ROLE = 'vcis-lambda-role';
    static API_GW_ROLE = 'vcis-apigw-role';
    static DEVELOPER_READ_ONLY_ROLE = 'vcis-developer-role';
    static SECRET_ROTATION_ROLE = 'vcis-secret-rotation-role';
}
