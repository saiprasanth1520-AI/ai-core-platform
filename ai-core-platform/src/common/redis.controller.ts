import { Controller, Get, Query, Logger } from "@nestjs/common";
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiSecurity,
} from "@nestjs/swagger";
import { RedisService } from "./redis.service";
import { InteractionDto, GetInteractionsQueryDto } from "./redis.dto";

@ApiTags("Redis")
@Controller("redis")
@ApiSecurity("x-api-key")
export class RedisController {
  private readonly logger = new Logger(RedisController.name);

  constructor(private readonly redisService: RedisService) {}

  @Get("interactions")
  @ApiOperation({ summary: "Get recent interactions" })
  @ApiResponse({
    status: 200,
    description: "List of recent interactions",
    type: [InteractionDto],
  })
  async getInteractions(
    @Query() query: GetInteractionsQueryDto,
  ): Promise<InteractionDto[]> {
    try {
      this.logger.debug("Fetching interactions from Redis", {
        limit: query.limit,
      });

      const interactions = await this.redisService.getInteractions(query.limit);

      this.logger.debug("Successfully retrieved interactions", {
        count: interactions.length,
      });

      return interactions;
    } catch (error) {
      this.logger.error("Failed to fetch interactions", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
