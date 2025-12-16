# AI Core Platform - System Patterns

## Architecture Overview
The AI Core Platform follows a microservices architecture pattern, containerized and deployed on Kubernetes.

## Key Components

### API Layer (Nest.js)
- REST API endpoints for text generation
- API key authentication middleware
- Request validation and error handling
- Response transformation and formatting
- CLI-generated module structure for consistency

### Storage Layer (Proposed Migration to Redis)
Current DynamoDB Implementation:
- API key storage and validation
- Usage tracking and metrics
- Request/response logging
- Rate limiting data

Proposed Redis Migration Benefits:
- Cloud-agnostic architecture
- Native Kubernetes deployment
- Consistent development and production environments
- Built-in persistence capabilities
- High performance for key-value operations
- Simpler local development workflow
- Reduced cloud vendor lock-in
- Native support for rate limiting patterns
- Rich data structure support
- Mature monitoring and operations tools

### AI Integration Layer
- AWS Bedrock client integration
- Model configuration management
- Response processing
- Error handling and retries

### Infrastructure (Terraform)
- AWS resource provisioning
- Infrastructure configuration
- IAM roles and permissions
- Network configuration

### Deployment (Kubernetes)
- Container orchestration
- Scaling policies
- Health monitoring
- Load balancing
- Redis cluster management

## Technical Decisions

### Framework Selection
Nest.js was chosen for:
- TypeScript support
- Modular architecture
- Built-in dependency injection
- Strong API development features
- Extensive middleware support
- CLI tooling for consistent structure

### Development Patterns
NestJS CLI is used for:
- Generating consistent application structure
- Creating modules, controllers, and services
- Maintaining architectural patterns
- Ensuring best practices
- Accelerating development workflow

### Storage Selection
Proposed migration to Redis from DynamoDB for:
- Cloud-agnostic architecture
- Native Kubernetes integration
- Simplified local development
- Rich data structure support
- High performance
- Strong community support
- Built-in persistence options
- Excellent rate limiting capabilities
- Reduced operational complexity

### Container Strategy
Docker and Kubernetes were chosen for:
- Consistent deployment
- Scalability
- Service isolation
- Resource optimization
- Easy updates and rollbacks

### Authentication Method
API key authentication was selected for:
- Simplicity
- Low overhead
- Easy integration
- Sufficient security for initial release
