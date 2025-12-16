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
exports.BedrockService = void 0;
const common_1 = require("@nestjs/common");
const AWS = require("aws-sdk");
let BedrockService = class BedrockService {
    constructor() {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: 'us-west-2',
        });
        this.bedrockClient = new AWS.Service({
            endpoint: 'https://bedrock.amazonaws.com',
        });
    }
    async performOperation(params) {
        return new Promise((resolve, reject) => {
            this.bedrockClient.makeRequest('operationName', params, (err, data) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(data);
                }
            });
        });
    }
};
exports.BedrockService = BedrockService;
exports.BedrockService = BedrockService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], BedrockService);
//# sourceMappingURL=bedrock.service.js.map