# Industry System Infrastructure CDK app

A project to hold the whole Industry System infrastructure stacks. 


 * `sudo npm install -g npm3`
 * `sudo npm install -g penv`
 * `penv {env}` 
 * `npm install`
 * `npm run build` compile typescript to js or `npm run watch` watch for changes and compile
 * `npm publish --tag {env}`

# Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `cdk deploy --c env={env}`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth --c env={env}`       emits the synthesized CloudFormation template

