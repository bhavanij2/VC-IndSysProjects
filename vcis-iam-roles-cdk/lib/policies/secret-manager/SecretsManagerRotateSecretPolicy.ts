import {Stack} from "@aws-cdk/cdk";
import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {Resources} from "../../model/Resources";
import {Statement} from "../../model/Statement";

export class SecretsManagerRotateSecretPolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, Resources.inlinePolicies.SECRETS_MANAGER_ROTATE_SECRET,
                new Statement(PolicyStatementEffect.Allow, ['secretsmanager:GetRandomPassword',
                        'secretsmanager:GetSecretValue',
                        'secretsmanager:DescribeSecret',
                        'secretsmanager:PutSecretValue',
                        'secretsmanager:UpdateSecretVersionStage'],
                    ['arn:aws:secretsmanager:us-east1:*:secret:vcis*'],
                    []));
        }
        return this.policy;
    }

}
