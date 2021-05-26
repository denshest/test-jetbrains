#!/usr/bin/env bash

export HOME="$HOME"
export USER="$USER"
export DOCKER_COMPOSE="${DOCKER_COMPOSE:-docker-compose}"
export COMPOSE_PROJECT_NAME="${COMPOSE_PROJECT_NAME:-}"

if [[ "$(uname)" == "Darwin" ]];
then
  export _UID=1999
  export _GID=1999
else
  export _UID="$(id -u)"
  export _GID="$(id -g)"
fi

${DOCKER_COMPOSE} build \
  --quiet \
  --build-arg UID=${_UID} \
  frontend
