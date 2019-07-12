import fs from 'fs-extra';
import _ from 'lodash';
import util from 'util';
import { FILES_DIR, AWS_PROFILE } from './config';
import rimraf from 'rimraf';
import { emitter, initProgressBar } from '../tools/progress';
import { asyncForEach } from '../tools/asyncForEach';
import { uploadBatchWrite } from '../tools/uploadBatchWrite';

const asyncRimraf = util.promisify(rimraf);
const outBatchDir = `${FILES_DIR}/step5/batch`;
const errorFile = `${FILES_DIR}/error.json`;

async function Step6() {
  const allFiles = fs.readdirSync(outBatchDir, { withFileTypes: true });
  const jsonFiles = _.filter(allFiles, f => f.name.endsWith('.json'));
  initProgressBar('upload', jsonFiles.length);

  await asyncRimraf(errorFile);

  const startUpload = async () => {
    await asyncForEach(jsonFiles, async (f: fs.Dirent) => {
      const file = `${outBatchDir}/${f.name}`;
      const awsProfile = AWS_PROFILE;
      try {
        await uploadBatchWrite(file, awsProfile);
      } catch (err) {
        console.error(err);
      }
      emitter('progress', 'upload', {});
    });
  };

  await startUpload();
}

export default Step6;
