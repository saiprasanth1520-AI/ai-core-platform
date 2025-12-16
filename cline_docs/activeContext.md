# AI Core Platform - Active Context

## Current Focus
Initial project setup and architecture definition for the AI Core Platform, with a focus on cloud-agnostic storage solution.

## Recent Changes
- Created project directory structure
- Initialized documentation
- Defined core architectural components
- Added NestJS CLI as a prerequisite
- Decided to migrate from DynamoDB to Redis for cloud-agnostic key-value storage

## Next Steps
1. Install NestJS CLI globally using npm
2. Generate base Nest.js application structure using CLI commands
3. Generate necessary modules, controllers, and services using NestJS CLI
4. Create Terraform configurations for AWS resources
5. Set up Redis cluster in Kubernetes
6. Implement API key authentication using Redis
7. Integrate AWS Bedrock client
8. Create Docker configuration for containerization
9. Define Kubernetes deployment manifests including Redis configuration

## Current Priorities
- Installing and configuring NestJS CLI
- Establishing the foundational architecture using CLI-generated structures
- Setting up Redis in the development environment
- Creating initial API endpoints through NestJS CLI generators
- Implementing basic authentication with Redis
- Defining Redis cluster topology
- Creating Redis persistence configuration

## Open Questions
- Specific AWS Bedrock model selection
- Redis cluster size and topology
- Backup and recovery strategy for Redis
- Monitoring and logging strategy
- Scaling parameters for Kubernetes deployment
- Redis memory allocation and optimization
- Data migration strategy from DynamoDB to Redis