MAKEFLAGS += --silent

export COMPOSE_PROJECT_NAME ?= test_jetbrains
export PROJECT_ID ?= 080
export DOCKER_COMPOSE = docker-compose -f deployments/local/docker-compose.yml

SCRIPT_DOCKER_DIR = scripts/
DOCKER = docker
YARN = yarn

.PHONY: *
SHELL=/bin/bash -o pipefail

help: ## Makefile help
	@printf "\033[33m%s:\033[0m\n" 'Available commands'
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[32m%-18s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# Installation
init: update-hooks ## Initialization and project start
	-${MAKE} stop build start install

install: ## Installing dependencies
	${DOCKER_COMPOSE} run --no-deps --rm -T frontend $(YARN) install

build: ## Building containers
	$(SCRIPT_DOCKER_DIR)local/docker_build.sh

build-frontend: ## Build frontend for production
	$(DOCKER_COMPOSE) exec -T frontend $(YARN) build

reinstall: clean rm-state-file init ## Clean up and project initialization

clean: ## Stopping containers and clean up
	$(DOCKER_COMPOSE) down --rmi local -v
rm-state-file:
	rm -rf frontend/build
	rm -rf frontend/node_modules

# Serving
start: ## Starting containers
	$(DOCKER_COMPOSE) up -d
restart: stop start
stop:
	$(DOCKER_COMPOSE) down

# Linting
lint: ## Linting
	$(DOCKER_COMPOSE) exec -T frontend $(YARN) lint

# Code style fixing
cs-fix: ## Code style fixing
	$(DOCKER_COMPOSE) exec -T frontend $(YARN) cs:fix

# Entering into containers
shell-frontend: ## Entering into containers to frontend
	$(DOCKER_COMPOSE) exec frontend sh
shell-nginx: ## Entering into containers to nginx
	$(DOCKER_COMPOSE) exec nginx bash

# Showing logs
logs-frontend: ## Showing logs to frontend
	$(DOCKER_COMPOSE) logs frontend
logs-nginx: ## Showing logs to nginx
	$(DOCKER_COMPOSE) logs nginx

# Other
ps:
	$(DOCKER_COMPOSE) ps
update-hooks: ## Git hooks: update all
	$(SCRIPT_DOCKER_DIR)local/update-hooks.sh
pre-commit: cs-fix lint git-add ## Git hooks: pre-commit
git-add:
	git add .

# Global
.DEFAULT_GOAL := help
