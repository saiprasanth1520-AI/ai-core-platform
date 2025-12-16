import { Injectable, Logger } from "@nestjs/common";
import { RedisService } from "../common/redis.service";
import { randomBytes } from "crypto";

@Injectable()
export class ApiKeyService {
  private readonly logger = new Logger(ApiKeyService.name);

  constructor(private readonly redisService: RedisService) {}

  // Method to generate a new API key
  generateApiKey(): string {
    this.logger.debug("Generating new API key");
    const apiKey = randomBytes(32).toString("hex");
    this.logger.debug("API key generated successfully");
    return apiKey;
  }

  // Method to store API key in Redis
  async storeApiKey(key: string, value: string): Promise<void> {
    try {
      this.logger.debug("Storing API key in Redis", {
        keyLength: key.length,
        valueLength: value.length,
      });
      await this.redisService.setApiKey(key, value);
      this.logger.debug("API key stored successfully");
    } catch (error) {
      this.logger.error("Failed to store API key", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  // Method to check if API key exists in Redis
  async getApiKeyFromRedis(key: string): Promise<string | null> {
    try {
      this.logger.debug("Checking API key in Redis", {
        keyLength: key.length,
      });
      const value = await this.redisService.getApiKey(key);
      this.logger.debug("API key lookup completed", {
        exists: !!value,
      });
      return value;
    } catch (error) {
      this.logger.error("Failed to get API key from Redis", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }

  // Method to generate a new API key using a root key
  async generateApiKeyWithRoot(rootKey: string): Promise<string> {
    try {
      this.logger.debug("Attempting to generate API key with root key");

      // Validate the root key
      const expectedRootKey = process.env.ROOT_KEY;
      if (rootKey !== expectedRootKey) {
        this.logger.warn("Invalid root key attempt");
        throw new Error("Invalid root key");
      }

      this.logger.log("Valid root key provided, generating new API key");
      const newApiKey = this.generateApiKey();

      this.logger.debug("Storing newly generated API key");
      await this.storeApiKey(newApiKey, "generated-via-root");

      this.logger.log("New API key generated and stored successfully");
      return newApiKey;
    } catch (error) {
      this.logger.error("Failed to generate API key with root key", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
