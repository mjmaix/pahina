#!/bin/sh -x


sh ./prep-module.sh hello-world || { echo "hello-world prep failed" ; exit 1; }

echo 'Build and Tests are passing'

ENV_TYPE=dev
BUCKET=pahina-shopify-api
STACK_NAME=pahina-shopify-api
OUTPUT_FILE=packaged.yaml
REGION=ap-southeast-1

sam package \
--output-template-file $OUTPUT_FILE \
--s3-bucket $BUCKET || { echo "sam package failed" ; exit 1; }

sam deploy \
--template-file $OUTPUT_FILE \
--stack-name $STACK_NAME \
--capabilities CAPABILITY_IAM \
--region $REGION \
--parameter-overrides \
   EnvType=$ENV_TYPE \
 || { echo "sam deploy failed" ; exit 1; }

sh ./post-deploy.sh hello-world