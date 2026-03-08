#!/bin/bash
set -e

NAME="forever-tabs"
VERSION=$(grep '"version"' manifest.json | head -1 | sed 's/.*: *"\(.*\)".*/\1/')
OUT="${NAME}-${VERSION}.zip"

rm -f "$OUT"
zip -r "$OUT" manifest.json background.js options.html options.js options.css icons/
echo "Built $OUT"
