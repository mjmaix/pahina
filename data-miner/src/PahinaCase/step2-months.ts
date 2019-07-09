import bluebird from 'bluebird';
import _ from 'lodash';
import createDb from './createDb';
import { extractLinks } from './helpers/scraper';
import { emitter, initProgressBar } from '../tools/progress';

const selector = '#container_date > a';
const dbName = 'meta';

async function Step2() {
  let count = 0;
  const { db } = createDb(dbName);
  const categories: string[] = db.get('categories').value();

  initProgressBar('months', categories.length);
  await bluebird.resolve(categories).mapSeries(async url => {
    emitter('progress', 'months', {});

    const links = await extractLinks(url, selector);
    count = count + links.length;
    console.log('\nCount:', count);
    const existing = db
      .read()
      .defaults({ docmonths: [] })
      .get('docmonths')
      .value();
    db.set('docmonths', [...existing, ...links]).value();
    db.write();

    return bluebird.resolve(links).delay(4000);
  });
}
export default Step2;
