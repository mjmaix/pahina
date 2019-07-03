import bluebird from 'bluebird';
import _ from 'lodash';

import createDb from './createDb';
import { emitter, initProgressBar } from './tools/progress';
import { extractAValueLink } from './tools/scraper';
import { getUrlAsKey } from './tools/getUrlAsKey';

const selector = '#container_title > ul > li > a';
const metaDbName = 'meta';
const dbName = 'showdocs';

async function Step3() {
  const { db: metaDb } = createDb(metaDbName);
  const urls = metaDb.get('docmonths').value();
  const { db } = createDb(dbName);

  initProgressBar('items', urls.length);
  await bluebird
    .resolve(urls)
    .map(
      async (url: string) => {
        let newItems = {};
        const keyUrl = getStatusKey(url);
        try {
          const savedValue = metaDb
            .read()
            .get(keyUrl)
            .value();
          const savedStatus =
            savedValue === 'true' || savedValue === Boolean(savedValue);
          console.log('savedStatus', savedStatus);
          if (!savedStatus) {
            const items = await extractAValueLink(url, selector);
            _.forEach(items, item => {
              const saveData = { ...item, locatedUrl: url };
              const key = getUrlAsKey(item.link);
              db.set(key, saveData).value();
            });
            metaDb.set(keyUrl, true).value();
            metaDb.write();
            db.write();
          } else {
            console.log('Skipping processed url', url);
          }
          emitter('progress', 'items', {});
        } catch (err) {
          console.log(err);
          metaDb.set(keyUrl, false);
          metaDb.write();
        }
        return bluebird.resolve(newItems).delay(2000);
      },
      {
        concurrency: 5,
      },
    )
    .then(() => {
      db.write();
      metaDb.write();
    })
    .catch(err => console.log(err));

  function getStatusKey(url: string): _.Many<string | number | symbol> {
    return `step3_success.${getUrlAsKey(url, 4)}`;
  }
}

export default Step3;
