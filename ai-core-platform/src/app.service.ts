import { Injectable, Logger } from "@nestjs/common";
import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from "@aws-sdk/client-bedrock-runtime";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import * as dotenv from "dotenv";
import { RedisService } from "./common/redis.service";

dotenv.config(); // Load environment variables

@Injectable()
export class AppService {
  private bedrockClient: BedrockRuntimeClient;
  private readonly logger = new Logger(AppService.name);

  constructor(private readonly redisService: RedisService) {
    try {
      this.logger.log("Initializing Bedrock Runtime client");
      this.bedrockClient = new BedrockRuntimeClient({
        region: process.env.AWS_REGION,
        credentials: fromEnv(),
      });
      this.logger.log("Bedrock Runtime client initialized successfully");
    } catch (error) {
      this.logger.error(
        "Failed to initialize Bedrock Runtime client",
        error.stack,
      );
      throw error;
    }
  }

  async getResponseFromBedrock(prompt: string): Promise<string> {
    try {
      const modelId = "meta.llama3-70b-instruct-v1:0";
      this.logger.debug("Preparing Bedrock request", {
        modelId,
        promptLength: prompt.length,
      });

      const formattedPrompt = `
<|begin_of_text|><|start_header_id|>user<|end_header_id|>
${prompt}
<|eot_id|>
<|start_header_id|>assistant<|end_header_id|>
`;

      const request = {
        prompt: formattedPrompt,
        max_gen_len: 512,
        temperature: 0.5,
        top_p: 0.9,
      };

      this.logger.debug("Invoking Bedrock model", {
        modelId,
        max_gen_len: request.max_gen_len,
        temperature: request.temperature,
      });

      const command = new InvokeModelCommand({
        contentType: "application/json",
        body: JSON.stringify(request),
        modelId,
      });

      const response = await this.bedrockClient.send(command);
      this.logger.debug("Received response from Bedrock");

      const nativeResponse = JSON.parse(
        new TextDecoder().decode(response.body),
      );
      const responseText = nativeResponse.generation || "No response";

      this.logger.debug("Processing Bedrock response", {
        hasResponse: !!nativeResponse.generation,
        responseLength: responseText.length,
      });

      // Save the interaction to Redis
      this.logger.debug("Saving interaction to Redis");
      await this.redisService.saveInteraction(prompt, responseText);
      this.logger.debug("Interaction saved successfully");

      return responseText;
    } catch (error) {
      this.logger.error("Error calling AWS Bedrock", {
        error: error.message,
        stack: error.stack,
      });
      throw new Error("Failed to get response from AWS Bedrock");
    }
  }
}
