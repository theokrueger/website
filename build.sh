#!/usr/bin/env bash
cd "$(dirname "$0")"
npx tsc && zola build || echo "Failed to build, see output"
