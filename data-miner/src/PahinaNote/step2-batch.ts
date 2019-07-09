import fs from 'fs-extra';
import _ from 'lodash';
import util from 'util';
import { exec } from 'child_process';
import { FILES_DIR, MAX_ITEMS } from './config';
import rimraf from 'rimraf';
import { emitter, initProgressBar } from '../tools/progress';
import { findDynamoDbTable } from '../tools/findDynamoDbTable';
import { createDynamoPutRequestFile } from '../tools/createDynamoPutRequestFile';
import { DataPool } from '../tools/DataPool';

const asyncExec = util.promisify(exec);
const asyncRimraf = util.promisify(rimraf);
const inputFile = `${FILES_DIR}/step1.json`;
const outDir = `${FILES_DIR}/step2`;
const errorFile = `${FILES_DIR}/error.json`;

interface DbCase {
  id: string;
  promotional: string;
  value: string;
  pahinaNoteAuthorId: string;
  pahinaNoteCaseId: string;
  status: string;
  priceLevel: string;
}

async function Step2() {
  const dbTable = await findDynamoDbTable('PahinaNote', 'dev');

  const data: DbCase[] = fs.readJSONSync(inputFile);
  const pool = new DataPool<DbCase>(data);

  initProgressBar('batches', pool.remainingIteration());

  await asyncRimraf(outDir);
  await asyncRimraf(errorFile);
  await asyncExec(`mkdir -p ${outDir}/batch`);
  await asyncExec(`mkdir -p ${outDir}/prep`);

  const groupBatch = async () => {
    while (pool.hasNext()) {
      emitter('progress', 'batches', {});
      const { data, ctr } = pool.next();
      try {
        await createDynamoPutRequestFile(outDir, dbTable, ctr, data);
      } catch (err) {
        fs.writeFileSync(errorFile, err);
        break;
      }
    }
  };

  await groupBatch();
}

export default Step2;
