export declare class InlinePolicies {
    static readonly CLOUDWATCH_LOGS = "CloudWatchBasicLoggingPolicy";
    static readonly SERVICE_CATALOG_END_USER_FULL_ACCESS = "ServiceCatalogEndUserFullAccessPolicy";
    static readonly LAMBDA_INVOKE = "LambdaInvokePolicy";
    static readonly SQS_RECEIVE_MESSAGE = "SqsReceiveMessage";
    static readonly SQS_PRODUCE_MESSAGE = "SqsProduceMessage";
    static readonly KINESIS_RECEIVE_MESSAGE = "KinesisReceiveMessagePolicy";
    static readonly KINESIS_PRODUCE_MESSAGE = "KinesisProduceMessagePolicy";
    static readonly SNS_PUBLISH = "SnsPublishMessage";
    static readonly S3_OBJECT_CRUD_POLICY = "S3ObjectCrud";
    static readonly KMS_DECRYPT = "KmsDecrypt";
    static readonly SECRET_MANAGER_READ = "SecretsManagerReadValuePolicy";
    static readonly SECRETS_MANAGER_ROTATE_SECRET = "SecretsManagerRotateSecretPolicy";
    static readonly RDS_ACCESS = "RDSAccess";
}
