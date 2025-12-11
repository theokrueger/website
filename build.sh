#!/bin/bash
# build and serve this webpage

IN_DIR="./"
OUT_F="./out.zip"
SERVE_CMD="python3 -m http.server -d ."

#####

if [[ "$1" == "help" ]]; then
	echo "build.sh -- build helper script for theokrueger.dev"
	echo "  compiles SSGen site located at IN_DIR to a zip file in OUT_F"
	echo ""
	echo "Usage: build.sh [VERB]"
	echo ""
	echo "Verbs (choose up to one):"
	echo "  help		Print this message"
	echo "  serve		After building, serve the built site using SERVE_CMD"
	echo ""
	echo "Configuration (set at top of build.sh):"
	echo "  SERVE_CMD	'$SERVE_CMD'"
	echo "  IN_DIR	'$IN_DIR'" # [sic]
	echo "  OUT_F		'$OUT_F'"
	exit
fi

die() {
	echo "Failed!"
	exit
}

TEMP_DIR="$(mktemp -d)"
if [[ -f "$OUT_F" ]]; then
        rm -v "$OUT_F"
fi

echo "Building Site..."
ssgen --enable-shell --debug --input "$IN_DIR" --output "$TEMP_DIR" || die

echo "Compressing Site..."
zip "$OUT_F" "$TEMP_DIR"/* || die

if [[ "$1" == "serve" ]]; then
	LAST_DIR="$PWD"
	echo "Serving Site..."
	cd "$TEMP_DIR" || die
        $SERVE_CMD || die
	cd "$LAST_DIR" || die
fi

echo "Cleaning up..."
rm -vrf "$TEMP_DIR" | sed 's/^/  /'|| die
