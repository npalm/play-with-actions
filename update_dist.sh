#!/usr/bin/env bash
set -x

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
repo="https://${GITHUB_ACTOR}:$1@github.com/${GITHUB_REPOSITORY}.git"
git add --all dist
echo 1
echo 2 --
changes=$(git status -s --porcelain --untracked-files=no | wc -l)
echo $changes
if [[ $changes -gt 0 ]]; then
    git commit -m "Add changes" -a
    #git push "${repo}" HEAD:$GITHUB_HEAD_REF
fi
