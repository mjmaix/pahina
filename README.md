## Setup workstation
1. Install `brew`
2. Install VSCode 
   1. TypeScript
   2. ...
3. Install AWS CLI
4. Install AWS SAM CLI
5. Install AWS Amplify CLI
6. Install Expo CLI
7. Install npm globally
   1. ts-node
   2. ios-deploy

## Setup AWS Profile
1. `aws configure`

## Create Shopify
1. Create private app. Create AWS SSM Parameter **Secured Key** entries entries using previous step's tokens.
   1. GraphQL
      1. `/<shopify-host>/<env>/Password`
      2. `/<shopify-host>/<env>/ApiKey`
      3. `/<shopify-host>/<env>/SharedSecret`
   2. Storefront
      1. `/<shopify-host>/<env>/Storefront`

## Setup backend
1. root - `./setup.sh`
2. app - `amplify push`
3. app - `amplify publish`
4. functions
   1. pahina-shopify-api
      1. Update cloudformation mappings/parameters
      2. Update `deploy.sh` environment overrides
      3. `./deploy.sh`
      4.  Create AWS SSM Parameter **Secured Key** entries entries using the API gateway **Invoke URL**.
          1.  `/pahina-config/<env>/pahina-shopify-api`
   2. pahina-shopify-triggers
      1.  Update cloudformation mappings/parameters
      2.  Update `deploy.sh` environment overrides
      3. `./deploy.sh`
   3. ~~pahina-shopify-webhooks~~ Currently not used
      1. ~~Update cloudformation mappings/parameters~~
      2. ~~`./deploy.sh`~~
5. ~~shopify-theme - ~~ 
   1. ~~Update cloudformation mappings/parameters~~
   2. ~~`./deploy.sh`~~

## Dev

1. Populate Cases/Notes using data-miner tool.
   1. Register using the app and get the user `id` in the Cognito User Pool.
   2. Update `data-miner/src/PahinaNote/step1-faker.ts` `username` variable to the `id` from previous step
   3. Comment out steps in `data-miner/src/index.ts`
   4. `ts-node .`
   5. `Publish` some notes to trigger `note-stream`, this will create a Shopify product
2. App and Webb `src/shared` are kept in sync using `web/scripts/sync-shared` project

## App deployment

1. Use expo to deploy.