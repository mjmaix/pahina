#!/bin/sh -x

yarn clean
yarn test || { echo "Test failed" ; exit 1; }
yarn build || { echo "Build failed" ; exit 1; }

