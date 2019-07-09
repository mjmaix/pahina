import fs from 'fs-extra';
import _ from 'lodash';
import util from 'util';
import { exec } from 'child_process';
import { ShowDoc } from './helpers/cleanFields';
import createDb from './createDb';
import { FILES_DIR } from './config';
import rimraf from 'rimraf';
import { emitter, initProgressBar } from '../tools/progress';
import { findDynamoDbTable } from '../tools/findDynamoDbTable';
import { DataPool } from '../tools/DataPool';
import { createDynamoPutRequestFile } from '../tools/createDynamoPutRequestFile';

const asyncExec = util.promisify(exec);
const asyncRimraf = util.promisify(rimraf);
const dbName = 'processed';
const outDir = `${FILES_DIR}/step5`;
const errorFile = `${FILES_DIR}/error.json`;

interface DbNoteCase extends ShowDoc {
  id: string;
}

async function Step5() {
  const dbTable = await findDynamoDbTable('PahinaCase', 'dev');

  const { path: dbPath } = createDb(dbName);
  const data: { [k: string]: ShowDoc } = fs.readJSONSync(dbPath);

  const array = _.reduce(
    data,
    (acc: DbNoteCase[], d: ShowDoc, k: string) => {
      acc.push({ ...d, id: k } as DbNoteCase);
      return acc;
    },
    [] as DbNoteCase[],
  );
  const pool = new DataPool<DbNoteCase>(array);

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

export default Step5;
