## Useful commands
 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy -c env=[non-prod|prod] --output output`      deploy this stack to your default AWS account/region
 * `cdk diff -c env=[non-prod|prod] --output output`        compare deployed stack with current state
 * `cdk synth -c env=[non-prod|prod] --output output`       emits the synthesized CloudFormation template


### Note:
* Reference to `{ENV}` in this documentation is the environment name [non-prod | prod]

## How to publish new version

##### Publish new version for a particular Environment {env}
 * `sudo npm install -g penv`
 * `penv {ENV}` 
 * `npm install`
 * `npm run build` compile typescript to js
 * `npm publish --tag {ENV}`
 
## Steps to create VPC

### Create EC2 KeyPair for Bastion Instances using AWS Console
* Check if EC2 KeyPair name already exists in SSM Parameter Store at - `/vcis/{ENV}/infra/vpc/input/bastionHostKeyName`
* If it does not exist, create EC2 KeyPair using AWS Console
* Download the private key and store it securely
* Update the above created KeyPair Name input parameter in SSM Parameter Store at - `/vcis/{ENV}/infra/vpc/input/bastionHostKeyName`


### VPC CDK Stack - Input Parameters from SSM Parameter Store

* Make sure below Parameters are defined in SSM Parameter Store.
* Details of these Parameter Path version being used will be found in `cdk.json` file under parent directory

|  Param                            | Param Path                                                |  
|-----------------------------------|-----------------------------------------------------------|
| VPC CIDR                          |  /vcis/{ENV}/infra/vpc/input/vpcCidrList                  |  
| Primary Central Bastion IP        |  /vcis/{ENV}/infra/vpc/input/primaryCentralBastionIP      |     
| Secondary Central Bastion IP      |  /vcis/{ENV}/infra/vpc/input/secondaryCentralBastionIP    | 
| Bastion Host Key Name             |  /vcis/{ENV}/infra/vpc/input/bastionHostKeyName           |
| Bastion Instance Type             |  /vcis/{ENV}/infra/vpc/input/bastionInstanceType          |

| Tags: Owner                         |  /vcis/{ENV}/infra/tags/owner                             |
| Tags: Cost-Center                   |  /vcis/{ENV}/infra/tags/costCenter                        |
| Tags: Project                       |  /vcis/{ENV}/infra/tags/project                           |
| Tags: Environment                   |  /vcis/{ENV}/infra/tags/env                               |
| Tags: Regulated                     |  /vcis/{ENV}/infra/tags/regulated                         |
| Tags: Data Classification           |  /vcis/{ENV}/infra/tags/dataClassification                |

### VPC CDK Stack - Output Params persisted in SSM Parameter Store

|  Param                            | Param Path                                                |  
|-----------------------------------|-----------------------------------------------------------|
| VPC ID                            |  /vcis/{ENV}/vpc-output/vpcId                             | 


### Synthesize CloudFormation template
 
Run the below command to synthesize CloudFormation template and store the json CF template under `output` folder.
 
With `--json` argument, template will be outputted in json format.

```script
cdk synth -c env={ENV} --output output
```

### Deploy CloudFormation template

```script
cdk deploy -c env={ENV} --output output
```