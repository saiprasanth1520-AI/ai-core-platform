# AI Core EDC Platform

A NestJS-based API platform for AI Core EDC (Electronic Data Capture) with built-in authentication, Redis integration, and Swagger documentation.

## Features

- API Key Authentication
- Redis Integration
- Swagger API Documentation
- Comprehensive Logging
- Environment Configuration
- Integration Support (including AWS Bedrock)
- Storage Management
- Example Endpoints

## Prerequisites

- Node.js (v14 or higher)
- Redis Server
- Docker (optional, for containerization)
- Environment Variables Setup

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```bash
PORT=3000                    # Application port (optional, defaults to 3000)
ROOT_KEY=your-root-key      # Root key for generating API keys
REDIS_HOST=localhost        # Redis host
REDIS_PORT=6379            # Redis port
```

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Development mode
npm run start

# Watch mode
npm run start:dev

# Production mode
npm run start:prod
```

## Docker Support

The application includes Docker support for easy deployment:

```bash
# Build and run with Docker Compose
docker-compose up -d
```

## API Documentation

Once the application is running, you can access the Swagger documentation at:

```
http://localhost:3000/api
```

The API documentation includes:

- Authentication endpoints
- Redis interaction endpoints
- Storage management
- Integration endpoints
- Example endpoints

## Authentication

The platform uses API key authentication. To generate a new API key:

1. Use the root key to generate an initial API key:

   ```
   POST /api-key/generate-with-root
   Body: { "rootKey": "your-root-key" }
   ```

2. All subsequent requests should include the API key in the header:
   ```
   x-api-key: your-api-key
   ```

## Project Structure

```
src/
├── api/              # API-related components
├── authentication/   # Authentication components
├── common/          # Shared components (including Redis)
├── example/         # Example implementations
├── integration/     # Integration components
│   └── bedrock/    # AWS Bedrock integration
├── storage/         # Storage management
└── main.ts         # Application entry point
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Redis Inspection

The project includes a Redis inspection script for debugging:

```bash
# Inspect Redis keys
./scripts/inspect-redis.sh
```

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is MIT licensed.
