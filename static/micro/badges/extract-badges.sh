#!/usr/bin/env bash
# reduce badges.json into badges.min.json for when it is fetched
# still has linebreaks for git efficiency
set -euxo pipefail

f="./badges.min.json"

cd "$(dirname "$0")"
cat ./badges.json |
    jq \
	--monochrome-output \
	--indent 0 \
	--sort-keys \
	-- '.["80x80"] | map ({title, img, desc})' \
    > "$f"
cat "$f"
