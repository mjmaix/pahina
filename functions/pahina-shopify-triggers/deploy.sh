#!/bin/sh -x

yarn --cwd note-stream clean
yarn --cwd note-stream install
yarn --cwd note-stream build

sam package --output-template-file packaged.yaml --s3-bucket pahina-shopify-triggers

sam deploy --template-file packaged.yaml --stack-name pahina-shopify-triggers --capabilities CAPABILITY_IAM --region ap-southeast-1