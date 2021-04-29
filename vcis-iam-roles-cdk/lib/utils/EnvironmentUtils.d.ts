export declare class EnvironmentUtils {
    private static NON_PROD;
    private static PROD;
    static envConcat(name: string): string;
    static envConcatWithSeparator(name: string, separator: string): string;
    static getEnvTag(): string;
}
