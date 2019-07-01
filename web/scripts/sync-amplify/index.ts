// import yargs from 'yargs';
// import { amplifyImportEnv } from './amplifyImportEnv';
import { exec } from 'child_process';
import { execCb } from './execCallback';

// yargs
//   .option('name', {
//     alias: 'n',
//   })
//   .require('name', true)
//   .usage('An amplify env name of the existing project');
const APP = '../app';
const SHARED = `src/shared`;

// const cmd = amplifyImportEnv();
// exec(cmd, execCb);
// exec(`amplify codegen`, execCb);
// exec(`cp ${APP_DIR}/.graphqlconfig.yml ./.graphqlconfig.yml`, execCb);
// exec(`rm -rf ./amplify`);
// exec(`cp -a ${APP_DIR}/amplify/. ./amplify`, execCb);

// pick runtime resources only since amplify management will be done in app

exec(`cp ${APP}/src/aws-exports.js ./src/aws-exports.js`, execCb);

exec(`cp ${APP}/${SHARED}/API.ts ./${SHARED}/API.ts`, execCb);
exec(`cp ${APP}/${SHARED}/types.ts ./${SHARED}/types.ts`, execCb);
exec(`cp ${APP}/${SHARED}/apolloClient.ts ./${SHARED}/apolloClient.ts`, execCb);
exec(`cp ${APP}/${SHARED}/typesGetter.ts ./${SHARED}/typesGetter.ts`, execCb);
exec(`cp ${APP}/${SHARED}/models.ts ./${SHARED}/models.ts`, execCb);
exec(`cp ${APP}/${SHARED}/validators.ts ./${SHARED}/validators.ts`, execCb);
exec(`cp ${APP}/${SHARED}/index.ts ./${SHARED}/index.ts`, execCb);

exec(`rm -rf ./${SHARED}/graphql`);
exec(`cp -R ${APP}/${SHARED}/graphql/ ./${SHARED}/graphql`, execCb);

exec(`rm -rf ./${SHARED}/utils`);
exec(`cp -R ${APP}/${SHARED}/utils/ ./${SHARED}/utils`, execCb);

exec(`rm -rf ./${SHARED}/errors`);
exec(`cp -R ${APP}/${SHARED}/errors/ ./${SHARED}/errors`, execCb);

exec(`rm -rf ./${SHARED}/actions`);
exec(`cp -R ${APP}/${SHARED}/actions/ ./${SHARED}/actions`, execCb);
