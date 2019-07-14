#!/bin/sh -x

sh ./prep-module.sh note-stream
sh ./prep-module.sh user-stream

echo 'Build and Tests are passing'

ENV_TYPE=dev
BUCKET=pahina-shopify-triggers
STACK_NAME=pahina-shopify-triggers
OUTPUT_FILE=packaged.yaml
TEMPLATE_FILE=template.yaml
REGION=ap-southeast-1

MODIFIED_SAMB_BIN=/Users/mjabadilla/codes/open-source/serverless-application-model/bin

sam package \
--output-template-file $OUTPUT_FILE \
--template-file $TEMPLATE_FILE \
--s3-bucket $BUCKET

$MODIFIED_SAMB_BIN/sam-translate.py \
--template-file $OUTPUT_FILE

aws cloudformation deploy \
--template-file $OUTPUT_FILE  \
--capabilities CAPABILITY_NAMED_IAM \
--stack-name $STACK_NAME