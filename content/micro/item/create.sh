#!/usr/bin/env bash
# create a new post
cd "$(dirname "$0")"

TITLE="$(echo "${@,,}" | tr ' ' '-')"
DATE="$(date '+%F')"
OUT="$PWD/$DATE-$TITLE.md"

echo \
"+++
title = \"$@\"
description = \"\"
+++
" > "$OUT"

echo "Created '$OUT'. Open?"
read
nano "$OUT"
