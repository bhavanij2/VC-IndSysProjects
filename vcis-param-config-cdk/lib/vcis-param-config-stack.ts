import cdk = require('@aws-cdk/cdk');
import { VcisApp, EnvironmentHolder } from '@monsantoit/vcis-cdk-utils';
import { TagParamConfigConstruct } from './tags/tag-param-config-construct';
import { VpcParamConfigConstruct } from './vpc-config/vpc-param-config-construct';

export class VcisParamConfigStack extends cdk.Stack {
  constructor(app: VcisApp, id: string, props?: cdk.StackProps) {
    const stackName = `${id}-${EnvironmentHolder.getEnv()}`
    super(app, stackName, props);
    this.configureTagParams();
    this.configureVpcParams();
  }

  private configureTagParams() {
    new TagParamConfigConstruct(this, 'tag-param-config-construct');
  }

  private configureVpcParams() {
    new VpcParamConfigConstruct(this, 'vpc-param-config-construct');
  }
}
