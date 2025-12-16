# Kubernetes Deployment Guide

This directory contains Kubernetes manifests for deploying the AI Core Platform.

## Prerequisites

- Kubernetes cluster (1.20+)
- kubectl configured to access your cluster
- Docker registry access
- SSL/TLS certificates for HTTPS
- Nginx Ingress Controller installed

## Directory Structure

```
k8s/
├── deployment.yaml        # Main application deployment
├── service.yaml          # Service configuration
├── redis-statefulset.yaml# Redis with persistent storage
├── secrets.yaml          # Application secrets
├── network-policy.yaml   # Network isolation rules
├── service-account.yaml  # AWS IAM integration
├── hpa-quota.yaml        # Autoscaling and resource quotas
├── ingress.yaml          # External access configuration
├── pdb-config.yaml       # PDB, ConfigMap
└── logging-config.yaml   # Logging setup with Filebeat and Metricbeat
```

## Deployment Steps

1. Create namespace and apply resource quotas:

```bash
kubectl apply -f hpa-quota.yaml
```

2. Create secrets:

```bash
# Update secrets.yaml with your base64 encoded values first
kubectl apply -f secrets.yaml
```

3. Setup AWS integration:

```bash
# Update service-account.yaml with your AWS account ID
kubectl apply -f service-account.yaml
```

4. Deploy Redis:

```bash
kubectl apply -f redis-statefulset.yaml
```

5. Apply network policies:

```bash
kubectl apply -f network-policy.yaml
```

6. Deploy core application:

```bash
# Build and push Docker image
docker build -t your-registry/ai-core-platform:latest .
docker push your-registry/ai-core-platform:latest

# Update deployment.yaml with your image registry
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

7. Configure monitoring and PDB:

```bash
kubectl apply -f pdb-config.yaml
```

8. Setup external access:

```bash
# Create TLS secret
kubectl create secret tls tls-secret --cert=path/to/tls.crt --key=path/to/tls.key

# Update ingress.yaml with your domain
kubectl apply -f ingress.yaml
```

9. Setup logging:

```bash
# Apply logging configuration
kubectl apply -f logging-config.yaml
```

## Verification

```bash
# Check all resources
kubectl get all -n ai-core-platform

# Verify pods are running
kubectl get pods -n ai-core-platform

# Check services
kubectl get svc -n ai-core-platform

# Verify ingress
kubectl get ingress -n ai-core-platform

# Check HPA
kubectl get hpa -n ai-core-platform

# Monitor pod metrics
kubectl top pods -n ai-core-platform
```

## Maintenance

### Scaling

- The application automatically scales between 2-5 replicas based on CPU/Memory usage
- Manual scaling if needed:
  ```bash
  kubectl scale deployment ai-core-platform --replicas=3
  ```

### Updates

- Use rolling updates for zero-downtime deployments
- Update image:
  ```bash
  kubectl set image deployment/ai-core-platform ai-core-platform=your-registry/ai-core-platform:new-tag
  ```

### Monitoring

- Access Prometheus metrics at `/metrics`
- ServiceMonitor automatically configures Prometheus scraping
- Set up Grafana dashboards for visualization

### Troubleshooting

- Check pod logs:
  ```bash
  kubectl logs -f deployment/ai-core-platform
  ```
- Check pod events:
  ```bash
  kubectl describe pod <pod-name>
  ```
- Redis persistence:
  ```bash
  kubectl get pvc # Check persistent volume claims
  ```

## Security Notes

1. Secrets Management

   - All sensitive data is stored in Kubernetes secrets
   - Use sealed-secrets or external secret management in production

2. Network Security

   - Network policies restrict pod communication
   - TLS enabled for ingress traffic
   - Basic auth configured for API endpoints

3. Resource Management
   - Resource quotas prevent resource exhaustion
   - PodDisruptionBudget ensures availability during maintenance

## Production Checklist

- [ ] Update domain in ingress.yaml
- [ ] Configure proper SSL certificates
- [ ] Set resource limits appropriate for your workload
- [ ] Configure backup strategy for Redis
- [ ] Set up logging solution (EFK/ELK)
- [ ] Configure proper monitoring alerts
- [ ] Review network policies
- [ ] Setup CI/CD pipeline
