export class InputParameterProvider {
    static get(paramName: any): void;
    static getEnv(): void;
}
export class NamingConvention {
    static apply(resourceName: any): any;
}
export class Tagger {
    static addtags(node: any, tags: any): void;
    static apply(node: any): void;
}
export class VcisApp {
    static isConstruct(x: any): any;
    loadContext(defaults: any): void;
    prepare(): void;
    run(): any;
    synthesizeStack(stackName: any): any;
    synthesizeStacks(stackNames: any): any;
    validate(): any;
}
export class VcisStack {
    static VALID_STACK_NAME_REGEX: RegExp;
    static annotatePhysicalName(construct: any, physicalName: any): void;
    static isConstruct(x: any): any;
    static isStack(x: any): any;
    constructor(scope: any, id: any, props: any);
    addDependency(stack: any, reason: any): void;
    calculateStackName(): any;
    collectMetadata(): any;
    dependencies(): any;
    findResource(path: any): any;
    formatArn(components: any): any;
    getOutput(): any;
    parentApp(): any;
    parseArn(arn: any, sepIfToken: any, hasName: any): any;
    parseEnvironment(env: any): any;
    prepare(): void;
    renameLogical(oldId: any, newId: any): void;
    reportMissingContext(key: any, details: any): void;
    requireAccountId(why: any): any;
    requireRegion(why: any): any;
    setParameterValue(parameter: any, value: any): void;
    stackDependencyReasons(other: any): any;
    synthesize(session: any): void;
    validate(): any;
}
