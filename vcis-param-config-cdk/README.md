## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy -c env=[non-prod | prod]`      deploy this stack to your default AWS account/region for `non-prod` or `prod` environment
 * `cdk diff -c env=[non-prod | prod]`        compare deployed stack with current state for `non-prod` or `prod` environment
 * `cdk synth -c env=[non-prod | prod]`       emits the synthesized CloudFormation template for `non-prod` or `prod` environment

## Naming Convention for the SSM Parameter Store Input Parameters

- We are storing `String` and `StringList` Type Parameters in the `Standard` SSM type

/vcis/{ENV_NAME}/[infra | app]/{PARAM_PATH}

- `ENV_NAME` values would be `[ non-prod | prod ]`
-  Values under `app` can be split for different stages `[dev | it]`

```script
                                    vcis
                        /                                \
                    non-prod                            prod
            /               \                        /          \
         infra                  app               infra        app 
        /   \  \           /     \     \           /  \        /   \
    tags   vpc ...       ...    ...  ...       ...  ...    ...  ...
                       /   \
                      ...  ...                    

NOTE: `prod` hierarchy is identical to `non-prod`
```

- Examples: 
    - */vcis/non-prod/tags/owner*
    - */vcis/prod/tags/owner*
    - */vcis/non-prod/vpc-input/vpcCidr*
    - */vcis/non-prod/vpc-output/vpcId*
  
- `Input` parameters to a stack are suffixed with `-input`. E.g. input parameters to `vpc` like `VPC CIDR` are defined under 
  `vpc-input` path as shown in the above example `/vcis/non-prod/vpc-input/vpcCidr`
  
- `Output` parameters to a stack are suffixed with `-output`. E.g. Output parameters of `vpc` like `VPC ID` are defined under 
  `vpc-output` path as shown in the above example `/vcis/non-prod/vpc-output/vpcId` 

## Infrastructure Parameters persisted in SSM Parameter Store

Details on defined parameters can be found under `cdk.json` file in [repository]
(https://github.platforms.engineering/POD-Inc/vcis-param-config-cdk)

### Tag Parameters

More documentation on Tagging can be found here: https://devtools.monsanto.net/docs/hosting/aws/tagging/

Required Tag Parameters:
- mon:owner
- mon:cost-center
- mon:project
- mon:env
- mon:regulated
- mon:data-classification


### VPC Input Parameters

- VpcCidrList
- PrimaryCentralBastionIP
- SecondaryCentralBastionIP
- BastionHostKeyName
- BastionInstanceType





                      