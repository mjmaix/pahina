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
const APP_DIR = '../app';
const SHARED_FOLDER = `src/shared`;

// const cmd = amplifyImportEnv();
// exec(cmd, execCb);
// exec(`amplify codegen`, execCb);
// exec(`cp ${APP_DIR}/.graphqlconfig.yml ./.graphqlconfig.yml`, execCb);
// exec(`rm -rf ./amplify`);
// exec(`cp -a ${APP_DIR}/amplify/. ./amplify`, execCb);

// pick runtime resources only since amplify management will be done in app

exec(`cp ${APP_DIR}/src/aws-exports.js ./src/aws-exports.js`, execCb);
exec(`cp ${APP_DIR}/${SHARED_FOLDER}/API.ts ./${SHARED_FOLDER}/API.ts`, execCb);
exec(
  `cp ${APP_DIR}/${SHARED_FOLDER}/types.ts ./${SHARED_FOLDER}/types.ts`,
  execCb,
);
exec(`rm -rf ./${SHARED_FOLDER}/graphql`);
exec(
  `cp -R ${APP_DIR}/${SHARED_FOLDER}/graphql/ ./${SHARED_FOLDER}/graphql`,
  execCb,
);
exec(`rm -rf ./${SHARED_FOLDER}/utils`);
exec(
  `cp -R ${APP_DIR}/${SHARED_FOLDER}/utils/ ./${SHARED_FOLDER}/utils`,
  execCb,
);
exec(`rm -rf ./${SHARED_FOLDER}/errors`);
exec(
  `cp -R ${APP_DIR}/${SHARED_FOLDER}/errors/ ./${SHARED_FOLDER}/errors`,
  execCb,
);
exec(`rm -rf ./${SHARED_FOLDER}/actions`);
exec(
  `cp -R ${APP_DIR}/${SHARED_FOLDER}/actions/ ./${SHARED_FOLDER}/actions`,
  execCb,
);
