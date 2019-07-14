#!/bin/sh -x

MODULE=$1

echo "Preparing module $MODULE"

if [ -z "$MODULE" ]
then
      echo "\$MODULE is empty"
      exit 1
fi

# install all dependencies
yarn --cwd $MODULE clean
yarn --cwd $MODULE install


