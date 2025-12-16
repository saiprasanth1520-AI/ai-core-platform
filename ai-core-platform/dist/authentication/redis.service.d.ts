export declare class RedisService {
    private client;
    constructor();
    setApiKey(key: string, value: string): Promise<void>;
    getApiKey(key: string): Promise<string | null>;
}
