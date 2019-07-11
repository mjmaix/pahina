#!/bin/sh -x

yarn --cwd products clean
yarn --cwd products install
yarn --cwd products test || { echo 'products test failed' ; exit 1; }
yarn --cwd products build || { echo 'user-stream build failed' ; exit 1; }


echo 'Build and Tests are passing'

sam package --output-template-file packaged.yaml --s3-bucket pahina-shopify-webhooks

sam deploy --template-file packaged.yaml --stack-name pahina-shopify-webhooks --capabilities CAPABILITY_IAM --region ap-southeast-1

