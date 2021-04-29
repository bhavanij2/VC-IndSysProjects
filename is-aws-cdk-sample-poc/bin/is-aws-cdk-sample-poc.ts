#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { IsAwsCdkSamplePocStack } from '../lib/is-aws-cdk-sample-poc-stack';

const app = new cdk.App();
new IsAwsCdkSamplePocStack(app, 'vcis-lambda-test');
app.run();
