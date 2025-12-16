import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthenticationModule } from "./authentication/authentication.module";
import { IntegrationModule } from "./integration/integration.module";
import { ApiKeyMiddleware } from "./authentication/api-key.middleware";
import { CommonModule } from "./common/common.module";

@Module({
  imports: [AuthenticationModule, IntegrationModule, CommonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ApiKeyMiddleware)
      .exclude("api-key/generate-with-root") // Exclude this route from middleware
      .forRoutes("*");
  }
}
