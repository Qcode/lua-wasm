#!/bin/bash

rm testPrograms/*.wasm > /dev/null 2> /dev/null
rm testPrograms/*.wat > /dev/null 2> /dev/null
rm testPrograms/*.actual > /dev/null 2> /dev/null
rm testPrograms/*.expected > /dev/null 2> /dev/null

for testFile in testPrograms/*.lua; do
    stem=${testFile%.*}

    node ts-built/main.js $testFile > $stem.wat
    wat2wasm $stem.wat -o $stem.wasm

    lua $testFile > $stem.expected
    node test.js $stem.wasm > $stem.actual

    diff $stem.expected $stem.actual
    if [ $? -ne 0 ]; then
        printf '\033[0;31m'
        echo "----------------------"
        echo "Test failed: $testFile"
        echo "----------------------"
    else
        printf '\033[0;32m'
        echo "Test passed: $testFile"
    fi
done

rm testPrograms/*.wasm > /dev/null 2> /dev/null
rm testPrograms/*.wat > /dev/null 2> /dev/null
rm testPrograms/*.expected > /dev/null 2> /dev/null
rm testPrograms/*.actual > /dev/null 2> /dev/null
