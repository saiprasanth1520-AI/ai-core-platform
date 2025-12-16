import { RedisService } from './redis.service';
export declare class ApiKeyService {
    private readonly redisService;
    constructor(redisService: RedisService);
    generateApiKey(): string;
    storeApiKey(key: string, value: string): Promise<void>;
    getApiKeyFromRedis(key: string): Promise<string | null>;
    generateApiKeyWithRoot(rootKey: string): Promise<string>;
}
