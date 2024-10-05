#!/bin/bash
rm -r ./_out
mkdir ./_out
ssgen --enable-shell --debug --input ./ --output ./_out
