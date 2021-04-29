import {PolicyStatementEffect} from "@aws-cdk/aws-iam";


export class Statement {

    readonly policyStatementEffect: PolicyStatementEffect;
    readonly actions: string[];
    readonly resources: string[];
    readonly conditions: Condition[];

    constructor(policyStatementEffect: PolicyStatementEffect,
                actions: string[],
                resources: string[],
                conditions: Condition[]) {
        this.policyStatementEffect = policyStatementEffect;
        this.actions = actions;
        this.resources = resources;
        this.conditions = conditions;
    }
}

export class Condition {
    key: string;
    value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
