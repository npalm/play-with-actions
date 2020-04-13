#!/usr/bin/env bash
set -x

git config --local user.email "action@github.com"
git config --local user.name "GitHub Action"
repo="https://${GITHUB_ACTOR}:$1@github.com/${GITHUB_REPOSITORY}.git"
changes=$(git status -s --porcelain --untracked-files=no | wc -l)
echo $changes
git add --all dist
echo 1
echo 2 --
[ $changes -gt 0 ] && echo changes
[ $changes -lt 0 ] && echo no changes
[ $changes -gt 0 ] && git commit -m "Add changes" -a
echo 3 --
git status
echo hi
[ $changes -gt 0 ] && git push "${repo}" HEAD:$GITHUB_HEAD_REF
