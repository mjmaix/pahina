declare module 'sync-folders' {
  export type SyncOpts = {
    type: string;
    sourcePath: string;
    targetPath: string;
    relativePath: string;
  };
  export type OnSync = (opts: SyncOpts) => void;

  export default function syncFolders(
    sourceDirs: string[] | string,
    targetDir: string,
    options: {
      bail?: boolean;
      type?: 'hardlink' | 'copy';
      ignore?: Array<RegExp | string>;
      quiet?: boolean;
      watch?: boolean;
      verbose?: boolean;
      onSync?: OnSync;
      onUpdate?: OnSync;
    },
  ): void;
}
