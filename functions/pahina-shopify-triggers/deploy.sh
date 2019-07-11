#!/bin/sh -x

yarn --cwd note-stream clean
yarn --cwd note-stream install 
yarn --cwd note-stream test || { echo 'note-stream test failed' ; exit 1; }
yarn --cwd note-stream build --project tsconfig.build.json || { echo 'user-stream build failed' ; exit 1; }

yarn --cwd user-stream clean
yarn --cwd user-stream install
yarn --cwd user-stream test || { echo 'user-stream test failed' ; exit 1; }
yarn --cwd user-stream build --project tsconfig.build.json || { echo 'user-stream build failed' ; exit 1; }


echo 'Build and Tests are passing'

sam package --output-template-file packaged.yaml --s3-bucket pahina-shopify-triggers

sam deploy --template-file packaged.yaml --stack-name pahina-shopify-triggers --capabilities CAPABILITY_NAMED_IAM --region ap-southeast-1