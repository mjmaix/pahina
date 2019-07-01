import process from 'process';
import yargs from 'yargs';
import rimraf from 'rimraf';
import util from 'util';

import { sync } from './sync';

const watchOpts = { alias: 'w' };
yargs.option('watch', watchOpts).usage('Watch for changes');

// change from web to root
process.chdir('../');
// should point to root where web/app
const projRootDir = process.cwd();

const APP = `${projRootDir}/app/src`;
const WEB = `${projRootDir}/web/src`;
const SHARED = `shared`;

const SYNC_SOURCE = `${APP}/${SHARED}`;
const SYNC_DEST = `${WEB}`;
const RIMRAF_CLEAN = `${WEB}/${SHARED}`;

/**
 * Execute here
 * 1. Clean
 * 2. Run sync
 */
const rimrafAsync = util.promisify(rimraf);

rimrafAsync(RIMRAF_CLEAN, {})
  .then(() => sync(SYNC_SOURCE, SYNC_DEST))
  .catch((err: Error) => console.log(err));
