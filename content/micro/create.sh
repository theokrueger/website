#!/usr/bin/env bash
# create a new post
cd "$(dirname "$0")"

TITLE="$(echo "$1" | tr ' ' '-')"
DATE="$(date '+%F')"
OUT="$PWD/$DATE-$TITLE.md"

echo \
    "+++
title = \"$TITLE\"
description = \"\"
+++
" > "$OUT"

echo "Created '$OUT'. Open?"
read
nano "$OUT"
