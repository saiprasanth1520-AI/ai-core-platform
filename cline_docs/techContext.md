# AI Core Platform - Technical Context

## Technology Stack

### Backend Framework
- Nest.js (TypeScript)
- Node.js runtime
- Express.js underlying server

### Storage
- Redis for key-value storage
- Redis Cluster for high availability
- Redis persistence for data durability

### AWS Services
- AWS Bedrock for AI model integration
- IAM for security
- Other AWS services as needed

### Infrastructure
- Terraform for AWS resource management
- Docker for containerization
- Kubernetes for orchestration
- Redis Operator for cluster management

### Development Tools
- TypeScript
- ESLint
- Prettier
- Jest for testing

## Development Setup

### Prerequisites
- Node.js and npm
- NestJS CLI (@nestjs/cli) installed globally
- Docker and Docker Compose
- Kubernetes CLI (kubectl)
- Terraform CLI
- Redis CLI (redis-cli)

### Local Development
- Redis instance in Kubernetes
- Environment variables for configuration
- Hot reloading for development
- Local Kubernetes cluster (e.g., minikube)
- Redis Commander for data visualization

### Deployment Pipeline
- Container image building
- Kubernetes manifest application
- Redis cluster configuration
- Environment configuration
- Data migration tools

## Technical Constraints

### Redis Configuration
- Memory management
- Persistence configuration
- Cluster topology
- Backup strategy
- Connection management

### Security Requirements
- API key validation
- Request authentication
- Data encryption
- Secure configuration management
- Redis ACL configuration

### Performance Considerations
- Response time targets
- Rate limiting
- Resource scaling
- Cache strategy
- Redis connection pooling
- Memory usage optimization

### Monitoring Requirements
- Health checks
- Performance metrics
- Error tracking
- Usage analytics
- Redis metrics monitoring
- Cluster state monitoring