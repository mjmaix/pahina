#!/bin/sh -x

sh ./prep-module.sh note-stream
sh ./prep-module.sh user-stream

echo 'Build and Tests are passing'

ENV_TYPE=dev
BUCKET=pahina-shopify-triggers
STACK_NAME=pahina-shopify-triggers
OUTPUT_FILE=packaged.yaml
REGION=ap-southeast-1

sam package \
--output-template-file $OUTPUT_FILE \
--s3-bucket $BUCKET

sam deploy \
--template-file $OUTPUT_FILE \
--stack-name $STACK_NAME \
--capabilities CAPABILITY_IAM \
--region $REGION \
--parameter-overrides \
   EnvType=$ENV_TYPE

sh ./post-deploy.sh note-stream
sh ./post-deploy.sh user-stream