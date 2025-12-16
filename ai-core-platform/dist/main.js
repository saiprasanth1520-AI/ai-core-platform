"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const swagger_1 = require("@nestjs/swagger");
dotenv.config();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = new swagger_1.DocumentBuilder()
        .setTitle("AI Core EDC Platform")
        .setDescription("The AI Core EDC API description")
        .setVersion("1.0")
        .addTag("AICore_EDC")
        .addBasicAuth({
        type: "http",
        scheme: "basic",
        description: "Enter your username and password",
    }, "basic-auth")
        .addApiKey({ type: "apiKey", name: "x-api-key", in: "header" }, "x-api-key")
        .addSecurityRequirements("basic-auth")
        .addSecurityRequirements("x-api-key")
        .build();
    const documentFactory = () => swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup("api", app, documentFactory);
    app.use(bodyParser.json());
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map