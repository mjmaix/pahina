PROFILE=mjdeveloper
PROJECT=pahina
ENV=dev
TEMPLATE_FILE=./cloudformation.yaml
STACK_NAME=$PROJECT-shopify-theme-$ENV
S3_BUCKET_NAME=$PROJECT-shopify-theme-$ENV-deployment
PATH_TO_UPLOAD=script-tag

CFN_PROJECT_S3_NAME=$PROJECT-shopify-theme-$ENV

# create deployment bucket
aws \
s3 mb s3://$S3_BUCKET_NAME \
--profile $PROFILE > /dev/null 2>&1

# create AWS resourcesb
aws \
cloudformation deploy \
--template-file $TEMPLATE_FILE \
--stack-name $STACK_NAME \
--parameter-overrides ProjectName=$PROJECT EnvType=$ENV \
--s3-bucket $S3_BUCKET_NAME \
--force-upload \
--no-fail-on-empty-changeset \
--profile $PROFILE || { echo "Cloudformation deploy failed." ; exit 1; }

# upload files
aws \
s3 cp $PATH_TO_UPLOAD s3://$CFN_PROJECT_S3_NAME/$PATH_TO_UPLOAD \
--recursive \
--acl public-read \
--profile $PROFILE