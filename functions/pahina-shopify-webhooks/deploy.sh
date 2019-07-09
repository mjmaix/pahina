#!/bin/sh -x

yarn --cwd products clean
yarn --cwd products install
yarn --cwd products build

sam package --output-template-file packaged.yaml --s3-bucket pahina-shopify-webhooks

sam deploy --template-file packaged.yaml --stack-name pahina-shopify-webhooks --capabilities CAPABILITY_IAM --region ap-southeast-1

