import { Module } from "@nestjs/common";
import { AuthenticationController } from "./authentication.controller";
import { AuthenticationService } from "./authentication.service";
import { ApiKeyMiddleware } from "./api-key.middleware";
import { ApiKeyService } from "./api-key.service";
import { CommonModule } from "../common/common.module";

@Module({
  imports: [CommonModule], // Import CommonModule for RedisService dependency
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ApiKeyMiddleware, ApiKeyService],
  exports: [AuthenticationService, ApiKeyMiddleware, ApiKeyService], // Export services for use in other modules
})
export class AuthenticationModule {}
