import cdk = require('@aws-cdk/cdk');
import lambda = require('@aws-cdk/aws-lambda');
import iam = require('@aws-cdk/aws-iam');

export class IsAwsCdkSamplePocStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    this.node.apply(new cdk.Tag('mon:owner','BBJANG'));
    this.node.apply(new cdk.Tag('mon:project','ValueCapture'));
    this.node.apply(new cdk.Tag('mon:cost-center','ValueCapture'));
    this.node.apply(new cdk.Tag('mon:env','non-prod'));
    this.node.apply(new cdk.Tag('mon:regulated','no'));
    this.node.apply(new cdk.Tag('mon:data-classification','internal'));

    const lambdaRole = iam.Role.import(this, 'vcis-lambda-test-role', {
      roleArn: 'arn:aws:iam::019181870962:role/VcisLambdaRole-test'
    });

    new lambda.Function(this, 'vcis-lambda-test', {
      functionName: 'vcis-lambda-test',
      runtime: lambda.Runtime.NodeJS810,
      code: lambda.Code.asset('lambda'),
      handler: 'index.handler',
      role: lambdaRole
    });
  }
}
