export class ManagedPolicies {

    static readonly READ_ONLY_ACCESS = 'arn:aws:iam::aws:policy/ReadOnlyAccess';
    static readonly XRAY_WRITE_ONLY_ACCESS = 'arn:aws:iam::aws:policy/AWSXrayWriteOnlyAccess';
    static readonly APIGW_INVOKE_FULL_ACCESS = 'arn:aws:iam::aws:policy/AmazonAPIGatewayInvokeFullAccess';
    static readonly LAMBDA_VPC_EXECUTION = 'arn:aws:iam::aws:policy/service-role/AWSLambdaVPCAccessExecutionRole';
}
