import yargs from 'yargs';
import syncFolders, { OnSync, SyncOpts } from 'sync-folders';

export function sync(source: string, dest: string) {
  const watch = yargs.argv.watch as boolean;
  const onSyncCb: OnSync = ({ sourcePath }: SyncOpts) => {
    console.log(`Synced folder ${sourcePath}`);
  };
  const onUpdateCb: OnSync = (opts: any) => {
    console.log(`Synced file ${opts}`);
  };
  syncFolders([source], dest, {
    watch,
    verbose: true,
    bail: true,
    type: 'copy',
    ignore: [/node_modules/],
    onSync: onSyncCb,
    onUpdate: onUpdateCb,
  });
}
