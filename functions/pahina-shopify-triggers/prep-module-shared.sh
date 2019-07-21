#!/bin/sh -x


echo "Preparing module shared"

# yarn --cwd $MODULE clean
yarn --cwd shared install
yarn --cwd shared test || { echo "shared test failed" ; exit 1; }
# yarn --cwd $MODULE build || { echo "$MODULE build failed" ; exit 1; }

# NOTE: shared/node_modules is not copied, rely on function peerDependencies
# yarn --cwd shared install --production 
# yarn --cwd shared copy:node_modules || { echo "shared copy node_modules failed" ; exit 1; }

