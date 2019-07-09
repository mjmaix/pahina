import _ from 'lodash';
import { extractLinks } from './helpers/scraper';

import createDb from './createDb';

const elibraryBookself = 'http://elibrary.judiciary.gov.ph/';
const selector = '#legal_menu > ul > li > a';

const dbName = 'meta';

async function Step1() {
  const { db } = createDb(dbName);
  await extractLinks(elibraryBookself, selector)
    .then(links => {
      return links;
    })
    .then(links => {
      db.set('categories', links).value();
      db.write();
    })
    .catch(function(err) {
      console.log(err);
    });
}

export default Step1;
