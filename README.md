# mlo-2

A minimal Node.js service demonstrating structured logging with [Pino](https://github.com/pinojs/pino), Prometheus metrics, environment-based configuration, and container orchestration manifests.

## Getting Started

Install dependencies and run the server:

```bash
npm install
npm start
```

The server listens on the port defined by `PORT` (default `3000`). A metrics endpoint is exposed at `/metrics` for Prometheus scraping.

## Configuration & Secrets

Configuration defaults live in `config/`. Override any value with environment variables or an `.env` file (see `.env.example`). Secrets such as `SECRET_TOKEN` should be supplied via environment variables or a secret manager and are never committed to the repository.

## Docker

Build and run the container:

```bash
docker build -t mlo-2 .
docker run -p 3000:3000 --env-file .env mlo-2
```

## Kubernetes

A sample deployment and service are provided under `k8s/`. Update the image and secrets references before applying:

```bash
kubectl apply -f k8s/deployment.yaml
```

## Amazon ECS

Example task definition and service configuration reside in `ecs/`. Replace placeholder values for image URIs, subnets, and secrets before deploying.
