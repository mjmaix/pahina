import util from 'util';
import { exec } from 'child_process';

const asyncExec = util.promisify(exec);
export const uploadBatchWrite = (relFilePath: string, awsProfile?: string) => {
  const profile = awsProfile ? `--profile ${awsProfile}` : '';
  const file = `file://${relFilePath}`;
  const script = `aws dynamodb batch-write-item --request-items ${file} ${profile} --return-consumed-capacity TOTAL`;
  return asyncExec(script);
};
