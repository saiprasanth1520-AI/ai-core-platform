import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Logger } from "@nestjs/common";

dotenv.config();

async function bootstrap() {
  const logger = new Logger("Bootstrap");
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log", "debug", "verbose"],
  });
  const config = new DocumentBuilder()
    .setTitle("AI Core EDC Platform")
    .setDescription("The AI Core EDC API description")
    .setVersion("1.0")
    .addTag("AICore_EDC")
    .addTag("Redis", "Redis interaction endpoints")
    .addBasicAuth(
      {
        type: "http",
        scheme: "basic",
        description: "Enter your username and password",
      },
      "basic-auth",
    )
    .addApiKey({ type: "apiKey", name: "x-api-key", in: "header" }, "x-api-key")
    .addSecurityRequirements("basic-auth")
    .addSecurityRequirements("x-api-key")
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, documentFactory);
  app.use(bodyParser.json()); // Add this line to parse JSON bodies
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  logger.log(`Application is running on: http://localhost:${port}`);
  logger.log(
    `Swagger documentation available at: http://localhost:${port}/api`,
  );
}
bootstrap().catch((err) => {
  const logger = new Logger("Bootstrap");
  logger.error("Failed to start application", err);
  process.exit(1);
});
