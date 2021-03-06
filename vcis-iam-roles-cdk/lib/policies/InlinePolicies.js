"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class InlinePolicies {
}
InlinePolicies.CLOUDWATCH_LOGS = 'CloudWatchBasicLoggingPolicy';
InlinePolicies.SERVICE_CATALOG_END_USER_FULL_ACCESS = 'ServiceCatalogEndUserFullAccessPolicy';
InlinePolicies.LAMBDA_INVOKE = 'LambdaInvokePolicy';
InlinePolicies.SQS_RECEIVE_MESSAGE = 'SqsReceiveMessage';
InlinePolicies.SQS_PRODUCE_MESSAGE = 'SqsProduceMessage';
InlinePolicies.KINESIS_RECEIVE_MESSAGE = 'KinesisReceiveMessagePolicy';
InlinePolicies.KINESIS_PRODUCE_MESSAGE = 'KinesisProduceMessagePolicy';
InlinePolicies.SNS_PUBLISH = 'SnsPublishMessage';
InlinePolicies.S3_OBJECT_CRUD_POLICY = 'S3ObjectCrud';
InlinePolicies.KMS_DECRYPT = "KmsDecrypt";
InlinePolicies.SECRET_MANAGER_READ = 'SecretsManagerReadValuePolicy';
InlinePolicies.SECRETS_MANAGER_ROTATE_SECRET = 'SecretsManagerRotateSecretPolicy';
InlinePolicies.RDS_ACCESS = 'RDSAccess';
exports.InlinePolicies = InlinePolicies;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5saW5lUG9saWNpZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJJbmxpbmVQb2xpY2llcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQWEsY0FBYzs7QUFFUCw4QkFBZSxHQUFHLDhCQUE4QixDQUFDO0FBQ2pELG1EQUFvQyxHQUFHLHVDQUF1QyxDQUFDO0FBQy9FLDRCQUFhLEdBQUcsb0JBQW9CLENBQUM7QUFDckMsa0NBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDMUMsa0NBQW1CLEdBQUcsbUJBQW1CLENBQUM7QUFDMUMsc0NBQXVCLEdBQUcsNkJBQTZCLENBQUM7QUFDeEQsc0NBQXVCLEdBQUcsNkJBQTZCLENBQUM7QUFDeEQsMEJBQVcsR0FBRyxtQkFBbUIsQ0FBQztBQUNsQyxvQ0FBcUIsR0FBRyxjQUFjLENBQUM7QUFDdkMsMEJBQVcsR0FBRyxZQUFZLENBQUM7QUFDM0Isa0NBQW1CLEdBQUcsK0JBQStCLENBQUM7QUFDdEQsNENBQTZCLEdBQUcsa0NBQWtDLENBQUM7QUFDbkUseUJBQVUsR0FBRSxXQUFXLENBQUM7QUFkNUMsd0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIElubGluZVBvbGljaWVzIHtcblxuICAgIHN0YXRpYyByZWFkb25seSBDTE9VRFdBVENIX0xPR1MgPSAnQ2xvdWRXYXRjaEJhc2ljTG9nZ2luZ1BvbGljeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNFUlZJQ0VfQ0FUQUxPR19FTkRfVVNFUl9GVUxMX0FDQ0VTUyA9ICdTZXJ2aWNlQ2F0YWxvZ0VuZFVzZXJGdWxsQWNjZXNzUG9saWN5JztcbiAgICBzdGF0aWMgcmVhZG9ubHkgTEFNQkRBX0lOVk9LRSA9ICdMYW1iZGFJbnZva2VQb2xpY3knO1xuICAgIHN0YXRpYyByZWFkb25seSBTUVNfUkVDRUlWRV9NRVNTQUdFID0gJ1Nxc1JlY2VpdmVNZXNzYWdlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgU1FTX1BST0RVQ0VfTUVTU0FHRSA9ICdTcXNQcm9kdWNlTWVzc2FnZSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtJTkVTSVNfUkVDRUlWRV9NRVNTQUdFID0gJ0tpbmVzaXNSZWNlaXZlTWVzc2FnZVBvbGljeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtJTkVTSVNfUFJPRFVDRV9NRVNTQUdFID0gJ0tpbmVzaXNQcm9kdWNlTWVzc2FnZVBvbGljeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNOU19QVUJMSVNIID0gJ1Nuc1B1Ymxpc2hNZXNzYWdlJztcbiAgICBzdGF0aWMgcmVhZG9ubHkgUzNfT0JKRUNUX0NSVURfUE9MSUNZID0gJ1MzT2JqZWN0Q3J1ZCc7XG4gICAgc3RhdGljIHJlYWRvbmx5IEtNU19ERUNSWVBUID0gXCJLbXNEZWNyeXB0XCI7XG4gICAgc3RhdGljIHJlYWRvbmx5IFNFQ1JFVF9NQU5BR0VSX1JFQUQgPSAnU2VjcmV0c01hbmFnZXJSZWFkVmFsdWVQb2xpY3knO1xuICAgIHN0YXRpYyByZWFkb25seSBTRUNSRVRTX01BTkFHRVJfUk9UQVRFX1NFQ1JFVCA9ICdTZWNyZXRzTWFuYWdlclJvdGF0ZVNlY3JldFBvbGljeSc7XG4gICAgc3RhdGljIHJlYWRvbmx5IFJEU19BQ0NFU1MgPSdSRFNBY2Nlc3MnO1xuXG5cbn1cbiJdfQ==