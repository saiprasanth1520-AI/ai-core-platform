import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
  Logger,
} from "@nestjs/common";
import { Request, Response, NextFunction } from "express";
import { ApiKeyService } from "./api-key.service";

@Injectable()
export class ApiKeyMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ApiKeyMiddleware.name);

  constructor(private readonly apiKeyService: ApiKeyService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      this.logger.debug("Processing API key authentication", {
        path: req.path,
        method: req.method,
      });

      const apiKey = req.headers["x-api-key"] as string;
      if (!apiKey) {
        this.logger.warn("API key is missing in request headers");
        throw new UnauthorizedException("API key is missing");
      }

      const validKey = await this.apiKeyService.getApiKeyFromRedis(apiKey);
      if (!validKey) {
        this.logger.warn("Invalid API key provided", {
          apiKey: apiKey.substring(0, 4) + "***", // Log only first 4 chars for security
        });

        const rootKey = req.body.rootKey;
        const expectedRootKey = process.env.ROOT_KEY;
        if (rootKey && rootKey === expectedRootKey) {
          this.logger.log("Valid root key provided, generating new API key");

          // Generate a new API key
          const newApiKey =
            await this.apiKeyService.generateApiKeyWithRoot(rootKey);

          // Set the new API key in the response header
          res.setHeader("x-new-api-key", newApiKey);
          this.logger.debug("New API key generated and set in response header");

          return next();
        }

        throw new UnauthorizedException("Invalid API key and root key");
      }

      this.logger.debug("API key authentication successful");
      next();
    } catch (error) {
      this.logger.error("Authentication error", {
        error: error.message,
        stack: error.stack,
      });
      throw error;
    }
  }
}
