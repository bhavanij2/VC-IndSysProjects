import cdk = require('@aws-cdk/cdk');
import {Statement} from "../model/Statement";
import {Policy, PolicyStatement} from "@aws-cdk/aws-iam";
import {NamingConvention} from "@monsantoit/vcis-cdk-utils";

export class PolicyUtils {

    static createPolicy(stack: cdk.Stack,
                               policyName: string,
                               ...statements: Statement[]): Policy {

        const policy = new Policy(stack, policyName, {policyName: NamingConvention.apply(policyName)});

        for (let i = 0; i < statements.length; i++) {
            const policyStatement = this.createStatement(statements[i]);
            policy.addStatement(policyStatement);
        }

        return policy;
    }

    private static createStatement(statement: Statement) {
        const policyStatement = new PolicyStatement(statement.policyStatementEffect);
        policyStatement.addActions(...statement.actions);
        policyStatement.addResources(...statement.resources);

        statement.conditions.forEach(condition => {
            policyStatement.addCondition(condition.key, condition.value);
        });

        return policyStatement;
    }
}
