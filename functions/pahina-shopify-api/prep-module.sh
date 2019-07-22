#!/bin/sh -x

MODULE=$1

echo "Preparing module $MODULE"

if [ -z "$MODULE" ]
then
      echo "\$MODULE is empty"
      exit 1
fi

yarn --cwd $MODULE clean
yarn --cwd $MODULE install
yarn --cwd $MODULE test || { echo "$MODULE test failed" ; exit 1; }
yarn --cwd $MODULE build || { echo "$MODULE build failed" ; exit 1; }

yarn --cwd $MODULE install --production
yarn --cwd $MODULE copy:node_modules || { echo "$MODULE copy node_modules failed" ; exit 1; }

