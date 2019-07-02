import _ from 'lodash';

export interface ShowDoc {
  locatedUrl: string;
  href: string;
  text: string;
  fields?: string[];
}

export interface ProcessedShowDoc {
  title: string;
  link: string;
  date?: string;
  code?: string;
}

export function cleanFields(docVal: ShowDoc) {
  const split = _.split(docVal.text, '\n');
  const wEtmpyArr = _.map(split, t => _.trim(t));
  const noEmptyArr = _.reject(wEtmpyArr, _.isEmpty);
  let irregSizeArr = noEmptyArr;
  if (irregSizeArr.length > 3) {
    const first = _.first(irregSizeArr) as string;
    const last = _.last(irregSizeArr) as string;
    const between = _.slice(irregSizeArr, 1, irregSizeArr.length - 1);
    irregSizeArr = [first, between.join(' '), last];
  }
  const fields = irregSizeArr;
  // validation
  let firstIsCode = false;
  let lastIsDate = false;
  let standardLength = false;
  const first = _.first(fields);
  if (first) {
    const dateVal = new Date(first);
    firstIsCode = _.isDate(dateVal);
  }
  const last = _.last(fields);
  if (last) {
    lastIsDate = _.isDate(new Date(last));
  }
  standardLength = fields.length === 3 || fields.length === 2;
  if (!firstIsCode) {
    console.log('detected not standard doc, first element is not code', fields);
  }
  if (!lastIsDate) {
    console.log(
      'detected not standard doc, last element is not date',
      docVal.href,
      fields,
    );
  }
  if (!standardLength) {
    console.log(
      'detected not standard doc, not standard length, more than 3',
      docVal.href,
      fields,
    );
  }

  const item = { ...docVal, fields };
  const processed: ProcessedShowDoc = {
    link: item.href,
    title: standardLength
      ? _.slice(item.fields, 1, 1).join('')
      : _.first(item.fields) || 'No title found',
    code: firstIsCode ? _.first(item.fields) : undefined,
    date: lastIsDate ? _.last(item.fields) : undefined,
  };

  return processed;
}
