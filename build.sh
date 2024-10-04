#!/bin/bash
rm -r ./_out
mkdir ./_out
ssgen --debug --input ./ --output ./_out
