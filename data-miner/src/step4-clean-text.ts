import fs from 'fs-extra';
import _ from 'lodash';
import { asyncForEach } from './tools/asyncForEach';
import { cleanFields, ShowDoc } from './tools/cleanFields';
import createDb from './createDb';

const showDocsDbName = 'showdocs';
const dbName = 'processed';

async function Step4() {
  const { path: showDocsPath } = createDb(showDocsDbName);
  const { db, path: dbPath } = createDb(dbName);
  const showdocs = Object.values(fs.readJSONSync(showDocsPath)) as ShowDoc[];
  const startProcess = async () => {
    await asyncForEach(
      showdocs,
      async (v: ShowDoc, i: number, arr: ShowDoc[]) => {
        const item = await cleanFields(v);
        const urlSplit = item.link.split('/');
        const l = urlSplit.length;
        db.set(_.slice(urlSplit, l - 3, l).join('/'), item).value();
      },
    );
  };

  await startProcess().then(() => {
    db.write();
  });
}

export default Step4;
