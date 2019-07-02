import fs, { PathLike, Dirent } from 'fs-extra';
import _ from 'lodash';
import { asyncForEach } from './tools/asyncForEach';
import { cleanFields } from './tools/cleanFields';
import createDb from './createDb';

interface ShowDoc {
  locatedUrl: string;
  href: string;
  text: string;
}

type ReadDirOpts = {
  encoding?: string | null;
  withFileTypes: true;
};

const showDocsDbName = 'showdocs';
const { db: showDocsDb } = createDb(showDocsDbName);

const dbName = 'processed';
const { db, path: dbPath } = createDb(dbName);

const showdocs = showDocsDb.read().value();
console.log('showdocs', showdocs);

function Step4() {
  const startProcess = async () => {
    const itemProcess = async () => {
      return asyncForEach(
        showdocs,
        async (v: ShowDoc, i: number, arr: ShowDoc[]) => {
          const item = await cleanFields(v);

          db.set(item.link, item).value();
        },
      );
    };
    await itemProcess();
  };

  startProcess()
    .then(() => {
      const processedItems = fs.readJsonSync(dbPath);
      console.log('processedItems', processedItems);
    })
    .then(() => {
      db.write();
    });
}

export default Step4;
