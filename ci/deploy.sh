#!/usr/bin/env bash

export VERSION="${CI_COMMIT_BRANCH}-${CI_COMMIT_SHORT_SHA}"
docker login "${CI_REGISTRY}" --username "${CI_REGISTRY_USER}" --password "${CI_REGISTRY_PASSWORD}"
docker-compose up -d --force-recreate
