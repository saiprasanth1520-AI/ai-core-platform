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
exports.ApiKeyMiddleware = void 0;
const common_1 = require("@nestjs/common");
const api_key_service_1 = require("./api-key.service");
let ApiKeyMiddleware = class ApiKeyMiddleware {
    constructor(apiKeyService) {
        this.apiKeyService = apiKeyService;
    }
    async use(req, res, next) {
        console.log('Request Body:', req.body);
        const apiKey = req.headers['x-api-key'];
        if (!apiKey) {
            console.error('API key is missing');
            throw new common_1.UnauthorizedException('API key is missing');
        }
        const validKey = await this.apiKeyService.getApiKeyFromRedis(apiKey);
        if (!validKey) {
            console.error('Invalid API key');
            const rootKey = req.body.rootKey;
            const expectedRootKey = process.env.ROOT_KEY;
            if (rootKey && rootKey === expectedRootKey) {
                console.log('Valid root key provided, generating new API key');
                const newApiKey = await this.apiKeyService.generateApiKeyWithRoot(rootKey);
                res.setHeader('x-new-api-key', newApiKey);
                return next();
            }
            throw new common_1.UnauthorizedException('Invalid API key and root key');
        }
        next();
    }
};
exports.ApiKeyMiddleware = ApiKeyMiddleware;
exports.ApiKeyMiddleware = ApiKeyMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [api_key_service_1.ApiKeyService])
], ApiKeyMiddleware);
//# sourceMappingURL=api-key.middleware.js.map