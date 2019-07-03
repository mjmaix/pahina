import fs from 'fs-extra';
import _ from 'lodash';
import { asyncForEach } from './tools/asyncForEach';
import { cleanFields, ShowDoc } from './tools/cleanFields';
import createDb from './createDb';
import { getUrlAsKey } from './tools/getUrlAsKey';

const showDocsDbName = 'showdocs';
const dbName = 'processed';

async function Step4() {
  const { path: showDocsPath } = createDb(showDocsDbName);
  const { db } = createDb(dbName);
  const showdocs = Object.values(fs.readJSONSync(showDocsPath)) as ShowDoc[];
  const startProcess = async () => {
    await asyncForEach(
      showdocs,
      async (v: ShowDoc, i: number, arr: ShowDoc[]) => {
        const item = await cleanFields(v);
        db.set(getUrlAsKey(item.link), item).value();
      },
    );
  };

  await startProcess().then(() => {
    db.write();
  });
}

export default Step4;
