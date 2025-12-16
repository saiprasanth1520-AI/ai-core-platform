import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { ApiKeyService } from './api-key.service';
export declare class ApiKeyMiddleware implements NestMiddleware {
    private readonly apiKeyService;
    constructor(apiKeyService: ApiKeyService);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
