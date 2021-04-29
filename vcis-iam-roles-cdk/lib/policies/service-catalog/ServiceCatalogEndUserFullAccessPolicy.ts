import {Policy, PolicyStatementEffect} from "@aws-cdk/aws-iam";
import {Condition, Statement} from "../../model/Statement";
import {PolicyUtils} from "../../utils/PolicyUtils";
import {InlinePolicies} from "../InlinePolicies";
import {Stack} from "@aws-cdk/cdk";


export class ServiceCatalogEndUserFullAccessPolicy {

    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack, InlinePolicies.SERVICE_CATALOG_END_USER_FULL_ACCESS,
                this.getCloudFormationStatement(),
                this.getServiceCatalogStatement())
        }
        return this.policy;
    }

    private static getServiceCatalogStatement(): Statement {
        return new Statement(PolicyStatementEffect.Allow,
            ['servicecatalog:DescribeRecord',
                'servicecatalog:ListRecordHistory',
                'servicecatalog:ScanProvisionedProducts',
                'servicecatalog:TerminateProvisionedProduct',
                'servicecatalog:UpdateProvisionedProduct'],
            ['*'],
            [new Condition('servicecatalog:roleLevel', 'self')]);
    }

    private static getCloudFormationStatement(): Statement {
        return new Statement(PolicyStatementEffect.Allow,
            ['catalog-user:*',
                'cloudformation:CreateStack',
                'cloudformation:DeleteStack',
                'cloudformation:DescribeStackEvents',
                'cloudformation:DescribeStacks',
                'cloudformation:GetTemplateSummary',
                'cloudformation:SetStackPolicy',
                'cloudformation:ValidateTemplate',
                'cloudformation:UpdateStack',
                'servicecatalog:DescribeProduct',
                'servicecatalog:DescribeProductView',
                'servicecatalog:DescribeProvisioningParameters',
                'servicecatalog:ListLaunchPaths',
                'servicecatalog:ProvisionProduct',
                'servicecatalog:SearchProducts',
                's3:GetObject'],
            ['*'],
            []);
    }
}

