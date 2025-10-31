#!/bin/bash
# build and serve this webpage

IN_DIR="./"
OUT_F="./out.zip"
SERVE_CMD="python3 -m http.server -d "

#####

die() {
	echo "Failed!"
	exit
}

TEMP_DIR="$(mktemp -d)"
if [[ -f "$OUT_F" ]]; then
        rm "$OUT_F"
fi

echo "Building Site..."
ssgen --enable-shell --debug --input "$IN_DIR" --output "$TEMP_DIR" || die

echo "Compressing Site..."
zip "$OUT_F" "$TEMP_DIR"/* || die

if [[ "$1" == "serve" ]]; then
	echo "Serving Site..."
        $SERVE_CMD "$TEMP_DIR" || die
fi

echo "Cleaning up..."
rm -rf "$TEMP_DIR" || die
