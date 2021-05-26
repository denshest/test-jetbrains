#!/usr/bin/env bash

if ! [ -x "$(command -v docker-compose)" ]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

PRE_COMMIT_SCRIPT=$PWD/${PRE_COMMIT_SCRIPT:-scripts/local/pre-commit.sh}
PRE_COMMIT_HOOKS=$PWD/${PRE_COMMIT_HOOKS:-.git/hooks/pre-commit}

COLOR="\e[34m"
DEFAULT_COLOR="\e[0m"

printf "$COLOR\n### %s$DEFAULT_COLOR\n" "Run pre-commit hooks ..."

if [ ! -f "$PRE_COMMIT_HOOKS" ]; then

  chmod +x $PRE_COMMIT_SCRIPT
  ln -sf $PRE_COMMIT_SCRIPT $PRE_COMMIT_HOOKS

  echo "Successfully created"
else
  echo "Git hooks already exists"
fi
