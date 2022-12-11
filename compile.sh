#!/bin/bash

node ts-built/main.js ${1} > compiled.wat
wat2wasm compiled.wat
mv compiled.wasm web/compiled.wasm
