# Local Development Guide

## Prerequisites
- Node.js and npm
- Docker and Docker Compose
- NestJS CLI (`npm install -g @nestjs/cli`)

## Local Development Stack
Instead of full Kubernetes deployment, we'll use:
- Docker Compose for container orchestration
- Local Redis container for storage
- Local NestJS development server with hot reload

## Getting Started

1. Start the Redis container:
```bash
docker-compose up redis
```

2. Install NestJS dependencies:
```bash
cd events-api
npm install
```

3. Start the NestJS development server:
```bash
npm run start:dev
```

The API will be available at http://localhost:3000 with hot reload enabled.

## Development Workflow
1. Make code changes in the events-api directory
2. The development server will automatically reload
3. Use Redis Commander (included in docker-compose) to inspect Redis data at http://localhost:8081

## Environment Setup
Copy the example environment file and update as needed:
```bash
cp events-api/.env.example events-api/.env
```

## Testing
Run the test suite:
```bash
cd events-api
npm test
```

## Key Differences from Production
- Uses Docker Compose instead of Kubernetes
- Single Redis instance instead of cluster
- Local development server instead of containerized application
- Hot reload enabled for faster development
- Redis Commander included for data inspection