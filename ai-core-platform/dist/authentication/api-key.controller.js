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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiKeyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const redis_service_1 = require("./redis.service");
const api_key_service_1 = require("./api-key.service");
const api_key_dto_1 = require("./api-key.dto");
let ApiKeyController = class ApiKeyController {
    constructor(redisService, apiKeyService) {
        this.redisService = redisService;
        this.apiKeyService = apiKeyService;
    }
    async generateApiKey() {
        const newApiKey = this.apiKeyService.generateApiKey();
        await this.redisService.setApiKey(newApiKey, "some-value");
        return newApiKey;
    }
    async generateApiKeyWithRoot(generateApiKeyWithRootDto) {
        return await this.apiKeyService.generateApiKeyWithRoot(generateApiKeyWithRootDto.rootKey);
    }
    async setApiKey(setApiKeyDto) {
        await this.redisService.setApiKey(setApiKeyDto.key, setApiKeyDto.value);
    }
};
exports.ApiKeyController = ApiKeyController;
__decorate([
    (0, common_1.Post)("generate"),
    (0, swagger_1.ApiOperation)({ summary: "Generate a new API key" }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "API key generated successfully",
        type: String,
    }),
    openapi.ApiResponse({ status: 201, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApiKeyController.prototype, "generateApiKey", null);
__decorate([
    (0, common_1.Post)("generate-with-root"),
    (0, swagger_1.ApiOperation)({ summary: "Generate a new API key with a root key" }),
    (0, swagger_1.ApiBody)({ type: api_key_dto_1.GenerateApiKeyWithRootDto }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: "API key generated with root key successfully",
        type: String,
    }),
    openapi.ApiResponse({ status: 201, type: String }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_key_dto_1.GenerateApiKeyWithRootDto]),
    __metadata("design:returntype", Promise)
], ApiKeyController.prototype, "generateApiKeyWithRoot", null);
__decorate([
    (0, common_1.Post)("set"),
    (0, swagger_1.ApiOperation)({ summary: "Set an API key with a value" }),
    (0, swagger_1.ApiBody)({ type: api_key_dto_1.SetApiKeyDto }),
    (0, swagger_1.ApiResponse)({ status: 204, description: "API key set successfully" }),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [api_key_dto_1.SetApiKeyDto]),
    __metadata("design:returntype", Promise)
], ApiKeyController.prototype, "setApiKey", null);
exports.ApiKeyController = ApiKeyController = __decorate([
    (0, swagger_1.ApiTags)("API Key"),
    (0, common_1.Controller)("api-key"),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        api_key_service_1.ApiKeyService])
], ApiKeyController);
//# sourceMappingURL=api-key.controller.js.map