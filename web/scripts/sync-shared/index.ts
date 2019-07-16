import process from 'process';
import { exec } from 'child_process';
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

const AWS_EXPORTS_SRC = `${APP}/aws-exports.js`;
const AWS_EXPORTS_DEST = `${WEB}/aws-exports.js`;
const SYNC_SOURCE = `${APP}/${SHARED}`;
const SYNC_DEST = `${WEB}`;
const RIMRAF_CLEAN = `${WEB}/${SHARED}`;

/**
 * Execute here
 * 1. Clean
 * 2. Run sync
 */
const rimrafAsync = util.promisify(rimraf);
const execAsync = util.promisify(exec);

rimrafAsync(RIMRAF_CLEAN, {})
  .then(() => execAsync(`cp ${AWS_EXPORTS_SRC} ${AWS_EXPORTS_DEST}`))
  .then(() => sync(SYNC_SOURCE, SYNC_DEST))
  .catch((err: Error) => console.log(err));
