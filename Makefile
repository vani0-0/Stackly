# Define variables
DOCKER_NETWORK=stackly_network
DOCKER_COMPOSE_FILE=docker-compose.yaml

# Default target to show available commands
help:
	@echo "Usage:"
	@echo "  make build         Build the Docker images for production"
	@echo "  make up            Start the Docker containers in detached mode"
	@echo "  make down          Stop and remove the Docker containers"
	@echo "  make clean         Remove all containers, images, and networks created by docker-compose"
	@echo "  make logs          View the logs of all containers"
	@echo "  make shell-api     Open an interactive shell in the API container"
	@echo "  make shell-web     Open an interactive shell in the Web container"
	@echo "  make network       Create Docker network"

# Create Docker network if it doesn't exist
network:
	@docker network ls | grep -q $(DOCKER_NETWORK) || docker network create $(DOCKER_NETWORK)

# Build Docker images using Docker BuildKit
build: network
	@COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f $(DOCKER_COMPOSE_FILE) build

# Start containers in detached mode
up: build
	@docker-compose -f $(DOCKER_COMPOSE_FILE) up -d

# Stop and remove containers
down:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down

# Clean up all resources created by docker-compose
clean:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) down --volumes --remove-orphans

# Show logs for all containers
logs:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) logs -f

# Open a shell in the API container
shell-api:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) run --entrypoint sh api

# Open a shell in the Web container
shell-web:
	@docker-compose -f $(DOCKER_COMPOSE_FILE) run --entrypoint sh web