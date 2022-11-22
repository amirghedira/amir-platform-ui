#!/bin/bash


sudo su -
cd /home/almalinux
pwd
REPO_PATH="home/almalinux/save-amir-platform-ui"
if [ ! -d "${REPO_PATH}" ]; then

    git clone "https://amirghedira:${GITLAB_TOKEN}@gitlab.com/amir-platform/amir-platform-ui.git" save-amir-platform-ui
    cd save-amir-platform-ui
    git remote add github "https://amirghedira:${GITHUB_TOKEN}@github.com/amirghedira/mypersonalweb-nextjs.git"
fi

git pull origin main || :
git push github main -f
exit 0
