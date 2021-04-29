#!/usr/bin/env node
import 'source-map-support/register';
import cdk = require('@aws-cdk/cdk');
import { HelloTestAppStack } from '../lib/hello-test-app-stack';

const app = new cdk.App();
new HelloTestAppStack(app, 'HelloTestAppStack');
app.run();
