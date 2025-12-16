import { Controller, Get, Query, Logger } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AppService } from "./app.service";
import { GetResponseDto } from "./app.dto";

@ApiTags("App")
@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);

  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ summary: "Get response from Bedrock" })
  @ApiQuery({
    name: "prompt",
    type: String,
    description: "Prompt for the response",
  })
  @ApiResponse({
    status: 200,
    description: "Successful response",
    type: String,
  })
  async getResponse(@Query() getResponseDto: GetResponseDto): Promise<string> {
    try {
      this.logger.log("Received request for Bedrock response", {
        promptLength: getResponseDto.prompt.length,
      });

      const response = await this.appService.getResponseFromBedrock(
        getResponseDto.prompt,
      );

      this.logger.debug("Successfully processed Bedrock request", {
        responseLength: response.length,
      });

      return response;
    } catch (error) {
      this.logger.error("Failed to get response from Bedrock", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
