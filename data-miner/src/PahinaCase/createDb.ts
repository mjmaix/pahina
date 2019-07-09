import { FILES_DIR } from './config';
import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

export function create(name: string) {
  const path = `${FILES_DIR}/${name}.json`;
  const adapter = new FileSync(path);
  const db = low(adapter);
  return { db, path };
}

export default create;
