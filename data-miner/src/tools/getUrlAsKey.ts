import _ from 'lodash';
export function getUrlAsKey(url: string, last: number = 3): string {
  const urlSplit = url.split('/');
  const l = urlSplit.length;
  return _.slice(urlSplit, l - last, l).join('/');
}
