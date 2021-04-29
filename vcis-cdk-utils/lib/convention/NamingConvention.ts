export class NamingConvention {

    static apply(stackName: string, resourceName: string) {
        return `${stackName}/${resourceName}`;
    }
}
