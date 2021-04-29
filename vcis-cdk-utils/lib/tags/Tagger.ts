import cdk = require('@aws-cdk/cdk');
import {Tags} from "./Tags";
import { CfnResource } from '@aws-cdk/cdk';

export class Tagger {

    static setup(){
        Tags.setup();
    }

    static apply(node: cdk.ConstructNode): void {
        node.apply(Tags.OWNER);
        node.apply(Tags.COST_CENTER);
        node.apply(Tags.PROJECT);
        node.apply(Tags.ENV);
        node.apply(Tags.REGULATED);
        node.apply(Tags.DATA_CLASSIFICATION);
    }

    static addTag(node: cdk.ConstructNode, tag: cdk.Tag) {
        node.apply(tag);
    }

    static addtags(node: cdk.ConstructNode, tags: cdk.Tag[]) {
        tags.forEach(value => {
            node.apply(value);
        })
    }

    static applyTagsToCfnResource(node: cdk.ConstructNode): void {
        const cfResource = node.children.find(child => child as CfnResource !== undefined) as CfnResource;

        cfResource.addPropertyOverride('Tags', 
            {
                "mon:owner": Tags.OWNER.value,
                "mon:cost-center": Tags.COST_CENTER.value,
                "mon:env": Tags.ENV.value,
                "mon:regulated": Tags.REGULATED.value,
                "mon:data-classification": Tags.DATA_CLASSIFICATION.value
            }
        );
    }
}
