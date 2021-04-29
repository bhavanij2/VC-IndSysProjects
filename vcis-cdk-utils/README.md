# CDK Utils Library


### Description

A library to hold standards for Industry System's resource creation with CDK

### Features

* Automate tagging to all of the resources.
* Populate properties from AWS SSM.

### Main exposed classes

 *  **VcisApp**: Subclass of `cdk.App`. 
    * Populates `InputParametersHolder` with the data in `context` field in `cdk.json` file.
    * Adds tags at App level, so all resources created as part of that App will have standard tags
 *  **InputParameterHolder**: 
    * Exposes the input parameters as a key value map.
    * Provides the environment configured to run the app
    * Depends on the usage of `VcisApp`*
 *  **EnvironmentHolder**: 
    * Exposes the environment (stage).
    * Depends on the usage of `VcisApp`*    
 *  **Tagger**: A class that exposes methods to add tags to a resource
 *  **NamingConvention**: Provides an standardized way to name Industry System resources. *Depends on the usage of `VcisStack` and `VcisApp`*
 *  **VcisStack**: Subclass of `cdk.Stack`. 
    * Defines the Input as a generic, so user can define input props to the stack
    * Defines the Output as a generic, so user can define stack outputs as needed
 
 
### How to Use

#### Application and Configuration
```javascript
import { VcisApp, InputParameterHolder } from '@monsantoit/vcis-cdk-utils'; 

const app = new VcisApp();

// Will retrieve your parameters from external storage and update the values into CDK context. 
InputParameterHolder.setup(app).then(() =>{
        new MyStack(app, 'stackName');
        app.run();
    }
)
```

#### Configuration File

Parameters can be stored on AWS SSM. Prefix must be `smm:/path/to/patameter:version`
`{ENV}`: Reference the actual environment (stage) 

```json
{
  "app": "node bin/myapp-cdk.js",
  "context": {
    "InputParameters": {
      "generic": {
          "vpc": {
            "id": "ssm:/vcis/{ENV}/vpc/id:1",
            "securityGroup": "ssm:/vcis/{ENV}/vpc/securityGroup:1"
          },
          "lambda": {
            "role": "hardcodedValue"
          }
        }
      }
    }
  }
```

#### Custom Stack
```javascript
import { VcisStack, VcisApp, EnvironmentHolder } from '@monsantoit/vcis-cdk-utils'; 

class MyStack extends VcisStack<CustomProps, Output> {
  
  constructor(scope: VcisApp, id: string, props?: CustomProps) {
    super(scope, id, props);
    
    const myConstruct = MyConstruct(this, 'id', props)
    
    this.output = {
      property: myConstruct.prop;
    }
  }
}

export class CustomProps implements cdk.StackProps{
  readonly stackName: string;
  customProp: string;
  
  constructor(scope: VcisApp, stackName: string){
    this.stackName = `${stackName}-${EnvironmentHolder.getEnv()}`;
    this.customProp: scope.getParam("customProp");
  }
}

export interface Output {
  property: any;
}


```

### How to add custom tagging
```javascript
import { Tagger } from '@monsantoit/vcis-cdk-utils';
import cdk = require('@aws-cdk/cdk');

//Add one tag app
Tagger.addTag(app.node, new cdk.Tag('customTagId', 'customTagValue'));

//Add multiple tags to app
const tags: Array<cdk.Tag> = [
    new cdk.Tag('customTagId1', 'customTagValue1'), 
    new cdk.Tag('customTagId2', 'customTagValue2')];
 
Tagger.addTags(app.node, tags);

```

### How to get the Environment
```javascript
import { EnvironmentHolder } from '@monsantoit/vcis-cdk-utils';

//Will return the actual stage: [non-prod | prod] OR [dev | it | prod]
EnvironmentHolder.getEnv();

```
 
### How to publish new version

##### From CI/CD
 * `npm install`
 * `npm run build` (compile typescript to js)
 * `npm publish --tag {env}`

##### From local machine
 * `npm install`
 * `npm run build` (compile typescript to js or `npm run watch` watch for changes and compile)
 * `npm publish` 
