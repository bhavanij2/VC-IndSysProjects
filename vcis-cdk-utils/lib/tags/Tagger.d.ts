import cdk = require('@aws-cdk/cdk');
export declare class Tagger {
    static setup(): void;
    static apply(node: cdk.ConstructNode): void;
    static addTag(node: cdk.ConstructNode, tag: cdk.Tag): void;
    static addtags(node: cdk.ConstructNode, tags: cdk.Tag[]): void;
    static applyTagsToCfnResource(node: cdk.ConstructNode): void;
}
