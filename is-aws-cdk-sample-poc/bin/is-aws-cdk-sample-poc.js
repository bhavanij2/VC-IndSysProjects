#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
const cdk = require("@aws-cdk/cdk");
const is_aws_cdk_sample_poc_stack_1 = require("../lib/is-aws-cdk-sample-poc-stack");
const app = new cdk.App();
new is_aws_cdk_sample_poc_stack_1.IsAwsCdkSamplePocStack(app, 'vcis-lambda-test');
app.run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYXdzLWNkay1zYW1wbGUtcG9jLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaXMtYXdzLWNkay1zYW1wbGUtcG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHVDQUFxQztBQUNyQyxvQ0FBcUM7QUFDckMsb0ZBQTRFO0FBRTVFLE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLElBQUksb0RBQXNCLENBQUMsR0FBRyxFQUFFLGtCQUFrQixDQUFDLENBQUM7QUFDcEQsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuaW1wb3J0ICdzb3VyY2UtbWFwLXN1cHBvcnQvcmVnaXN0ZXInO1xuaW1wb3J0IGNkayA9IHJlcXVpcmUoJ0Bhd3MtY2RrL2NkaycpO1xuaW1wb3J0IHsgSXNBd3NDZGtTYW1wbGVQb2NTdGFjayB9IGZyb20gJy4uL2xpYi9pcy1hd3MtY2RrLXNhbXBsZS1wb2Mtc3RhY2snO1xuXG5jb25zdCBhcHAgPSBuZXcgY2RrLkFwcCgpO1xubmV3IElzQXdzQ2RrU2FtcGxlUG9jU3RhY2soYXBwLCAndmNpcy1sYW1iZGEtdGVzdCcpO1xuYXBwLnJ1bigpO1xuIl19