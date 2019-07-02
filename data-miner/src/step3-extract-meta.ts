import bluebird from 'bluebird';
import _ from 'lodash';

import createDb from './createDb';
import { emitter, initProgressBar } from './tools/progress';
import { extractAValueLink } from './tools/scraper';

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
        try {
          const items = await extractAValueLink(url, selector);
          emitter('progress', 'items', {});
          _.forEach(items, item => {
            const urlSplit = item.link.split('/');
            const l = urlSplit.length;
            db.set(_.slice(urlSplit, l - 3, l).join('/'), item).value();
          });
        } catch (err) {
          console.log(err);
        }
        return bluebird.resolve(newItems).delay(2000);
      },
      {
        concurrency: 5,
      },
    )
    .then(db.write())
    .catch(err => console.log(err));
}

export default Step3;
