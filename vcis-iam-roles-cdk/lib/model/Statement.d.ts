import { PolicyStatementEffect } from "@aws-cdk/aws-iam";
export declare class Statement {
    readonly policyStatementEffect: PolicyStatementEffect;
    readonly actions: string[];
    readonly resources: string[];
    readonly conditions: Condition[];
    constructor(policyStatementEffect: PolicyStatementEffect, actions: string[], resources: string[], conditions: Condition[]);
}
export declare class Condition {
    key: string;
    value: string;
    constructor(key: string, value: string);
}
