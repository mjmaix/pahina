import fs from 'fs-extra';
import _ from 'lodash';
import util from 'util';
import { exec } from 'child_process';
import { FILES_DIR, AWS_PROFILE } from './config';
import rimraf from 'rimraf';
import { emitter, initProgressBar } from './tools/progress';
import { asyncForEach } from './tools/asyncForEach';

const asyncExec = util.promisify(exec);
const asyncRimraf = util.promisify(rimraf);
const outBatchDir = `${FILES_DIR}/step5/batch`;
const errorFile = `${FILES_DIR}/step6_error.json`;

async function Step6() {
  const allFiles = fs.readdirSync(outBatchDir, { withFileTypes: true });
  const jsonFiles = _.filter(allFiles, f => f.name.endsWith('.json'));
  initProgressBar('upload', jsonFiles.length);

  await asyncRimraf(errorFile);

  const startUpload = async () => {
    await asyncForEach(jsonFiles, async (f: fs.Dirent) => {
      const script = `aws dynamodb batch-write-item --request-items file://${outBatchDir}/${f.name} --profile ${AWS_PROFILE} --return-consumed-capacity TOTAL`;
      try {
        await asyncExec(script);
      } catch (err) {
        console.error(err);
      }
      emitter('progress', 'upload', {});
    });
  };

  await startUpload();
}

export default Step6;
