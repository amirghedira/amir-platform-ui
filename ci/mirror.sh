#!/bin/bash

REPO_PATH="/home/centos/save-amir-platform-ui/"
if [ ! -d "${REPO_PATH}" ]; then
    cd "${REPO_PATH}"
    git clone "https://amirghedira@${GITLAB_TOKEN}gitlab.com/amir-platform/amir-platform-ui.git" save-amir-platform-ui
    git remote add github https://github.com/amirghedira/mypersonalweb-nextjs.git   
fi

cd "${REPO_PATH}" && git pull origin main || :
git push github main -f
exit 0
