import yargs from 'yargs';

function amplifyImportEnv() {
  const amplifyMeta = require('../../../app/amplify/team-provider-info.json');
  const localAwsInfo = require('../../../app/amplify/.config/local-aws-info.json');

  const envName = yargs.argv.name as string;
  const cfConfig = amplifyMeta[envName];
  const awsConfig = localAwsInfo[envName];
  const cmd = `
    #!/bin/bash
    set -e
    IFS='|'

    PROVIDER_CONFIG=\"${JSON.stringify(cfConfig, undefined, 2).replace(
      /"/g,
      '\\"',
    )}\"

    AWS_CONFIG="${JSON.stringify(awsConfig, undefined, 2).replace(/"/g, '\\"')}"

    amplify env import \
    --name ${envName} \
    --config $PROVIDER_CONFIG \
    --awsInfo $AWS_CONFIG \
    --yes

`;
  return cmd;
}

export { amplifyImportEnv };
