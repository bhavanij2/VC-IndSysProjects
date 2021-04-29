# IAM Roles CDK module


### Description

This module contains a stack to create the following roles:
* `Developer role` Read-only access through console and CLI - Valid
* `Lambda role` Assumed by lambda and contains all needed policies for POD lambdas to run - N/A
* `API GW role` Contains all policies needed by Api GW to work - N/A
* `Secret Rotation role` Assumed by secret rotation lambda and grants permission to modify things on Secrets Manager - N/A


### How to publish new version

##### From CI/CD
 * `sudo npm install -g npm3`
 * `sudo npm install -g penv`
 * `penv {env}` 
 * `npm3 update`
 * `npm3 install`
 * `npm run build` compile typescript to js or `npm run watch` watch for changes and compile
 * `npm publish --tag {env}`

##### From local machine
 * `sudo npm install -g npm3` 
 * `npm3 update`
 * `npm3 install`
 * `npm run build` compile typescript to js or `npm run watch` watch for changes and compile
 * `npm publish` 
  

### How to create a new Role


```
    const role = new Role(stack, 
        Resources.API_GW_ROLE, 
        {
            assumedBy: new ServicePrincipal(ServicePrincipals.API_GW),
            roleName: NamingConvention.apply(Resources.API_GW_ROLE)
        }
     );
```
`assumedBy:` defines which principal is able to assume the role that is being defined. It could be an AWS service, as well as a users logging into the account through SAML or a cognito user group. 


### How to create a new Policy


```
    private static policy: Policy;

    public static get(stack: Stack): Policy {
        if (!this.policy) {
            this.policy = PolicyUtils.createPolicy(stack,
                NamingConvention.apply(InlinePolicies.SNS_PUBLISH),
                new Statement(PolicyStatementEffect.Allow,
                ['sns:Publish'],
                ['*'],
                []));
        }
        return this.policy;
    }
```


###### Important Note:

 
Policies may be referenced from many roles or users, so **policies must be singleton objects**. If not, CDK will fail on runtime for policies used by different roles because there cannot be two resources with the same name.



