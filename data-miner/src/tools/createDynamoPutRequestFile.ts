import fs from 'fs-extra';
import util from 'util';
import { exec } from 'child_process';

const asyncExec = util.promisify(exec);

export const createDynamoPutRequestFile = async (
  outDir: string,
  dbTable: string,
  i: number,
  batch: any[],
) => {
  const fName = `${i}.json`;

  const batchFile = `${outDir}/prep/${fName}`;
  await fs.writeJSON(batchFile, batch);

  const jdpScript = `
        ./node_modules/.bin/json-dynamo-putrequest \
        ${dbTable} \
        ${batchFile} \
        --output ${outDir}/batch/${fName} \
        --beautify `;

  return await asyncExec(jdpScript);
};
