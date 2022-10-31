#!/usr/bin/env bash


ENV_FILE=".env"

echo "API_URL=${API_URL}" >> "${ENV_FILE}"

export VERSION="${CI_COMMIT_BRANCH}-${CI_COMMIT_SHORT_SHA}"
docker login "${CI_REGISTRY}" --username "${CI_REGISTRY_USER}" --password "${CI_REGISTRY_PASSWORD}"
docker-compose up -d --force-recreate
