import cdk = require('@aws-cdk/cdk');
import { VcisApp, VcisStack, InputParameterHolder } from '@monsantoit/vcis-cdk-utils';
import { BastionInstanceConstruct } from './construct/bastion-instance/bastion-instance-construct';
import { VpcBastionInstancesConstruct } from './construct/bastion-instance/vpc-bastion-instances-construct';
import { VcisVpcOutputConstruct } from './construct/output/vcis-vpc-output-construct';
import { VpcParameterStoreOutputConstruct } from './construct/output/vpc-parameter-store-output-construct';
import { VpcBastionInstanceSGConstruct } from './construct/security-group/vpc-bastion-instance-sg-construct';
import { VpcSecurityGroupsConstruct } from './construct/security-group/vpc-security-groups-construct';
import { VcisVpc2AzConstruct } from './construct/vpc/vcis-vpc-2az-construct';
import ec2 = require('@aws-cdk/aws-ec2');

export interface VcisVpcStackOutput {
  vpc: ec2.VpcNetwork,
  sshSecurityGroup: ec2.CfnSecurityGroup,
  rdsSecurityGroup: ec2.CfnSecurityGroup
}

export class VcisVpcStack extends VcisStack<cdk.StackProps, VcisVpcStackOutput>  {
  constructor(app: VcisApp, id: string, props?: cdk.StackProps) {
    super(app, id, props);

    const vpc = new VcisVpc2AzConstruct().createVpc(this);
    const bastionSg = new VpcBastionInstanceSGConstruct(this, vpc).bastionInstanceSecurityGroup;
    const bastionInstances = new VpcBastionInstancesConstruct(this, vpc, bastionSg).bastionInstances;
    const vpcSecurityGroups = this.createVpcSecurityGroups(vpc, bastionSg);

    this.output = {
      vpc: vpc,
      sshSecurityGroup: vpcSecurityGroups.sshSecurityGroup,
      rdsSecurityGroup: vpcSecurityGroups.rdsSecurityGroup
    }

    this.persistVpcOutputInParameterStore();
    this.export(vpc, bastionInstances.primary, bastionInstances.secondary);
  }

  private createVpcSecurityGroups(vpc: ec2.VpcNetwork, bastionSg: ec2.SecurityGroup): VpcSecurityGroupsConstruct {
    return new VpcSecurityGroupsConstruct(this, vpc, bastionSg);
  }

  private persistVpcOutputInParameterStore() {
    new VpcParameterStoreOutputConstruct(this, {
      parentAppNode: this.parentApp()!!.node,
      vpc: this.output.vpc,
      sshSecurityGroup: this.output.sshSecurityGroup,
      rdsSecurityGroup: this.output.rdsSecurityGroup
    })
  }

  private export(vpc: ec2.VpcNetwork, primaryBastion: BastionInstanceConstruct, secondaryBastion: BastionInstanceConstruct): void {
    const bastionHostKeyName = (InputParameterHolder.get('inputs'))['bastionHostKeyName'];

    new VcisVpcOutputConstruct(this, {
      stackName: this.stackName,
      bastionHostKeyName: bastionHostKeyName,
      vpc: vpc,
      primaryBastion: primaryBastion,
      secondaryBastion: secondaryBastion
    });
  }
}