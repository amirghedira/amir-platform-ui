#!/bin/bash

git pull origin main || :
git remote add github https://github.com/amirghedira/mypersonalweb-nextjs.git
git push github main -f
exit 0
