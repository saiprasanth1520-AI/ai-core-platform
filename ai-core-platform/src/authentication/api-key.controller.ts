import { Controller, Post, Body, Logger } from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiSecurity,
} from "@nestjs/swagger";
import { RedisService } from "../common/redis.service";
import { ApiKeyService } from "./api-key.service";
import { GenerateApiKeyWithRootDto, SetApiKeyDto } from "./api-key.dto";

@ApiTags("API Key")
@Controller("api-key")
export class ApiKeyController {
  private readonly logger = new Logger(ApiKeyController.name);

  constructor(
    private readonly redisService: RedisService,
    private readonly apiKeyService: ApiKeyService,
  ) {}

  @Post("generate")
  @ApiOperation({ summary: "Generate a new API key" })
  @ApiResponse({
    status: 201,
    description: "API key generated successfully",
    type: String,
  })
  async generateApiKey(): Promise<string> {
    try {
      this.logger.log("Generating new API key");
      const newApiKey = this.apiKeyService.generateApiKey();
      this.logger.debug("API key generated successfully");

      await this.redisService.setApiKey(newApiKey, "some-value"); // Replace 'some-value' with actual value logic
      this.logger.log("API key stored in Redis");

      return newApiKey;
    } catch (error) {
      this.logger.error("Failed to generate API key", error.stack);
      throw error;
    }
  }

  @Post("generate-with-root")
  @ApiOperation({ summary: "Generate a new API key with a root key" })
  @ApiSecurity("root-key")
  @ApiBody({ type: GenerateApiKeyWithRootDto })
  @ApiResponse({
    status: 201,
    description: "API key generated with root key successfully",
    type: String,
  })
  async generateApiKeyWithRoot(
    @Body() generateApiKeyWithRootDto: GenerateApiKeyWithRootDto,
  ): Promise<string> {
    try {
      this.logger.log("Generating new API key with root key");
      const newKey = await this.apiKeyService.generateApiKeyWithRoot(
        generateApiKeyWithRootDto.rootKey,
      );
      this.logger.debug("API key generated successfully with root key");
      return newKey;
    } catch (error) {
      this.logger.error(
        "Failed to generate API key with root key",
        error.stack,
      );
      throw error;
    }
  }

  @Post("set")
  @ApiOperation({ summary: "Set an API key with a value" })
  @ApiBody({ type: SetApiKeyDto })
  @ApiResponse({ status: 204, description: "API key set successfully" })
  async setApiKey(@Body() setApiKeyDto: SetApiKeyDto): Promise<void> {
    try {
      this.logger.log("Setting API key value");
      await this.redisService.setApiKey(setApiKeyDto.key, setApiKeyDto.value);
      this.logger.debug("API key value set successfully");
    } catch (error) {
      this.logger.error("Failed to set API key value", error.stack);
      throw error;
    }
  }
}
