import { Module } from "@nestjs/common";
import { IntegrationService } from "./integration.service";
import { BedrockService } from "./bedrock/bedrock.service";

@Module({
  controllers: [],
  providers: [IntegrationService, BedrockService],
})
export class IntegrationModule {}
