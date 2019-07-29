PROFILE=mjdeveloper
PROJECT=pahina
ENV=dev
TEMPLATE_FILE=./cloudformation.yaml
STACK_NAME=$PROJECT-$ENV-shopify-theme
S3_BUCKET_NAME=$PROJECT-$ENV-shopify-theme-deployment
PATH_TO_UPLOAD=script-tag

CFN_PROJECT_S3_NAME=$PROJECT-$ENV-shopify-theme

# create deployment bucket
aws \
s3 mb s3://$S3_BUCKET_NAME \
--profile $PROFILE || echo "Bucket already created"

# create AWS resourcesb
aws \
cloudformation deploy \
--template-file $TEMPLATE_FILE \
--stack-name $STACK_NAME \
--parameter-overrides ProjectName=$PROJECT EnvType=$ENV \
--s3-bucket $S3_BUCKET_NAME \
--profile $PROFILE

# upload files
aws \
s3 cp $PATH_TO_UPLOAD s3://$CFN_PROJECT_S3_NAME/$PATH_TO_UPLOAD \
--recursive \
--acl public-read \
--profile $PROFILE