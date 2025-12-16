import { Injectable, Logger } from "@nestjs/common";
import Redis from "ioredis";

@Injectable()
export class RedisService {
  private client: Redis;
  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.client = new Redis({
      host: "redis",
      port: 6379,
    });

    this.client.on("error", (err) => {
      this.logger.error("Redis Client Error:", err);
    });

    this.client.on("connect", () => {
      this.logger.log("Successfully connected to Redis");
    });
  }

  async setApiKey(key: string, value: string): Promise<void> {
    try {
      await this.client.set(key, value);
    } catch (error) {
      this.logger.error(`Error setting API key: ${error.message}`);
      throw error;
    }
  }

  async getApiKey(key: string): Promise<string | null> {
    try {
      return await this.client.get(key);
    } catch (error) {
      this.logger.error(`Error getting API key: ${error.message}`);
      throw error;
    }
  }

  async saveInteraction(prompt: string, response: string): Promise<void> {
    try {
      const timestamp = new Date().toISOString();
      const interaction = {
        prompt,
        response,
        timestamp,
      };

      this.logger.log("Saving interaction to Redis");

      // Save to a Redis list with interactions
      await this.client.lpush("interactions", JSON.stringify(interaction));

      // Optionally maintain a reasonable list size (e.g., last 1000 interactions)
      await this.client.ltrim("interactions", 0, 999);

      this.logger.log("Successfully saved interaction");
    } catch (error) {
      this.logger.error(`Error saving interaction: ${error.message}`);
      throw error;
    }
  }

  async getInteractions(limit: number = 10): Promise<
    Array<{
      prompt: string;
      response: string;
      timestamp: string;
    }>
  > {
    try {
      const interactions = await this.client.lrange(
        "interactions",
        0,
        limit - 1,
      );
      return interactions.map((interaction) => JSON.parse(interaction));
    } catch (error) {
      this.logger.error(`Error getting interactions: ${error.message}`);
      throw error;
    }
  }
}
