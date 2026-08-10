#!/usr/bin/env bash
# create a new post
cd "$(dirname "$0")"

TITLE="$1"
DATE="$(date '+%F')"

echo \
    "+++
title = \"$TITLE\"
description = \"\"
+++
" > "$PWD/$DATE-$TITLE.md"
