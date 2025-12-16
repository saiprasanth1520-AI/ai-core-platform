export declare class AppService {
    private bedrockClient;
    constructor();
    getResponseFromBedrock(prompt: string): Promise<string>;
}
