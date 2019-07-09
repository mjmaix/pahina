import { exec } from 'child_process';
import util from 'util';
const asyncExec = util.promisify(exec);

export const findDynamoDbTable = async (tableName: string, env: string) => {
  const script = `aws dynamodb list-tables --query 'TableNames[?starts_with(@, \`${tableName}\`) == \`true\` && ends_with(@, \`${env}\`)]'`;
  const result = await asyncExec(script);
  const resultObj = JSON.parse(result.stdout);
  if (resultObj.length < 1) {
    throw new Error(`No table matching ${tableName}*${env} found`);
  }
  console.log(`Tables found matching ${tableName}*${env}`, resultObj);
  return resultObj[0];
};
