declare module 'console' {
  // @ts-ignore
  export = typeof import('console');
}
