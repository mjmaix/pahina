import fs from 'fs-extra';
import _ from 'lodash';
import util from 'util';
import { exec } from 'child_process';
import { ShowDoc } from './tools/cleanFields';
import createDb from './createDb';
import { FILES_DIR, DYNAMODB_TABLE } from './config';
import rimraf from 'rimraf';
import { emitter, initProgressBar } from './tools/progress';

const asyncExec = util.promisify(exec);
const asyncRimraf = util.promisify(rimraf);
const dbName = 'processed';
const outPreDir = `${FILES_DIR}/step5/prep`;
const outBatchDir = `${FILES_DIR}/step5/batch`;
const errorFile = `${FILES_DIR}/step5_error.json`;

const MAX_ITEMS = 25;

interface DbNoteCase extends ShowDoc {
  id: string;
}

async function Step5() {
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

  const mod = array.length % MAX_ITEMS ? 1 : 0;
  const totalFiles = Math.floor(array.length / MAX_ITEMS);
  initProgressBar('batches', totalFiles + mod);

  await asyncRimraf(outBatchDir);
  await asyncRimraf(outPreDir);
  await asyncRimraf(errorFile);
  await asyncExec(`mkdir -p ${outBatchDir}`);
  await asyncExec(`mkdir -p ${outPreDir}`);

  const groupBatch = async () => {
    let i = 0;
    while (true) {
      i += 1;
      emitter('progress', 'batches', {});
      await createPutRequestScript(i, pullBatchData());

      if (array.length < 1) {
        break;
      }
    }
  };

  const pullBatchData = () => {
    let newB: any[] = [];
    _.times(MAX_ITEMS, () => {
      if (array.length > 0) {
        newB.push(array.pop());
      }
    });
    return newB;
  };

  const createPutRequestScript = async (i: number, batch: any[]) => {
    const fName = `${i}.json`;

    const batchFile = `${outPreDir}/${fName}`;
    fs.writeJSONSync(batchFile, batch);

    const jdpScript = `
        ./node_modules/.bin/json-dynamo-putrequest \
        ${DYNAMODB_TABLE} \
        ${batchFile} \
        --output ${outBatchDir}/${fName} \
        --beautify `;

    try {
      await asyncExec(jdpScript);
    } catch (err) {
      fs.writeFileSync(errorFile, err);
    }
  };

  await groupBatch();
}

export default Step5;
