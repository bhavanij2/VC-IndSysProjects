#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { SampleCdkStack } from '../lib/sample-cdk-stack';

const app = new cdk.App();
new SampleCdkStack(app, 'SampleCdkStack');
app.run();
