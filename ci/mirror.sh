#!/bin/bash

git pull origin main || :
git push github main -f
exit 0
