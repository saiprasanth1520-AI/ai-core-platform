"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const client_bedrock_runtime_1 = require("@aws-sdk/client-bedrock-runtime");
const credential_provider_env_1 = require("@aws-sdk/credential-provider-env");
const dotenv = require("dotenv");
dotenv.config();
let AppService = class AppService {
    constructor() {
        this.bedrockClient = new client_bedrock_runtime_1.BedrockRuntimeClient({
            region: process.env.AWS_REGION,
            credentials: (0, credential_provider_env_1.fromEnv)(),
        });
    }
    async getResponseFromBedrock(prompt) {
        try {
            const modelId = "meta.llama3-70b-instruct-v1:0";
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
            const command = new client_bedrock_runtime_1.InvokeModelCommand({
                contentType: "application/json",
                body: JSON.stringify(request),
                modelId,
            });
            const response = await this.bedrockClient.send(command);
            const nativeResponse = JSON.parse(new TextDecoder().decode(response.body));
            return nativeResponse.generation || "No response";
        }
        catch (error) {
            console.error("Error calling AWS Bedrock:", error.message, error.stack);
            throw new Error("Failed to get response from AWS Bedrock");
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], AppService);
//# sourceMappingURL=app.service.js.map