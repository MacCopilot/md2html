#!/bin/bash

DOCKER_BUILD_ARGS_FILE=".env"
DOCKER_BUILD_CMD="docker build"

while IFS= read -r line; do
  DOCKER_BUILD_CMD+=" --build-arg $line"
done < "$DOCKER_BUILD_ARGS_FILE"

DOCKER_BUILD_CMD+=" -t wiki_fronted:latest . -f wiki_fronted.Dockerfile"

eval "$DOCKER_BUILD_CMD"