import { RedisService } from "./redis.service";
import { ApiKeyService } from "./api-key.service";
import { GenerateApiKeyWithRootDto, SetApiKeyDto } from "./api-key.dto";
export declare class ApiKeyController {
    private readonly redisService;
    private readonly apiKeyService;
    constructor(redisService: RedisService, apiKeyService: ApiKeyService);
    generateApiKey(): Promise<string>;
    generateApiKeyWithRoot(generateApiKeyWithRootDto: GenerateApiKeyWithRootDto): Promise<string>;
    setApiKey(setApiKeyDto: SetApiKeyDto): Promise<void>;
}
