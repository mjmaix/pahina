import yargs from 'yargs';
import syncFolders, { OnSync, SyncOpts } from 'sync-folders';

yargs
  .option('watch', {
    alias: 'w',
  })
  .usage('Watch for changes');

const watch = yargs.argv.watch as boolean;

const APP = '../app/src/';
const WEB = './src/';
const SHARED = `shared`;

const onSyncCb: OnSync = ({ sourcePath }: SyncOpts) => {
  console.log(`Synced folder ${sourcePath}`);
};

const onUpdateCb: OnSync = (opts: any) => {
  console.log(`Synced file ${opts}`);
};

syncFolders([`${APP}/${SHARED}`], `${WEB}/`, {
  watch,
  verbose: true,
  bail: true,
  ignore: [/node_modules/],
  onSync: onSyncCb,
  onUpdate: onUpdateCb,
});
