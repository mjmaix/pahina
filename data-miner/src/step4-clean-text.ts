import fs, { PathLike, Dirent } from 'fs-extra';
import _ from 'lodash';
import { asyncForEach } from './tools/asyncForEach';
import { cleanFields, ShowDoc } from './tools/cleanFields';
import createDb from './createDb';

const showDocsDbName = 'showdocs';
const { db: showDocsDb, path: showDocsPath } = createDb(showDocsDbName);

const dbName = 'processed';
const { db, path: dbPath } = createDb(dbName);

const showdocs = Object.values(fs.readJSONSync(showDocsPath)) as ShowDoc[];

async function Step4() {
  const startProcess = async () => {
    await asyncForEach(
      showdocs,
      async (v: ShowDoc, i: number, arr: ShowDoc[]) => {
        const item = await cleanFields(v);
        console.log('item', item);
        const urlSplit = item.link.split('/');
        const l = urlSplit.length;
        db.set(_.slice(urlSplit, l - 3, l).join('/'), item).value();
      },
    );
  };

  await startProcess()
    .then(() => {
      const processedItems = fs.readJsonSync(dbPath);
      console.log('processedItems', processedItems);
    })
    .then(() => {
      db.write();
    });
}

export default Step4;
