#!/bin/bash

REPO_PATH="${PROJECT_HOME}/save-infra-playbook/"

cd "${REPO_PATH}" && git pull origin main || :
git push github main -f
exit 0
