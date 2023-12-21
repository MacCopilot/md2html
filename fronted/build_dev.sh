#!/bin/bash

DOCKER_BUILD_ARGS_FILE=".env"
DOCKER_BUILD_CMD="docker build"

while IFS= read -r line; do
  DOCKER_BUILD_CMD+=" --build-arg $line"
done < "$DOCKER_BUILD_ARGS_FILE"

DOCKER_BUILD_CMD+=" -t nextwiki_next_dev:latest . -f nextwiki_next.Dockerfile"

eval "$DOCKER_BUILD_CMD"