// tslint:disable no-console

export type RecordName =
  | 'GetUserError'
  | 'CreateUserError'
  | 'UpdateUserError'
  | 'PermissionsCameraRollDenied';
export interface Record {
  name: RecordName;
  attributes?: {
    error?: string;
  };
  // metrics?: {
  //     [k: string]: number
  // },
}

export const logError = (...err: any[]) =>
  console.error('[ERROR]', JSON.stringify(err, undefined, 2));
export const logRecord = (rec: Record) =>
  console.log('[RECORD]', JSON.stringify(rec, undefined, 2));
export const logInfo = (...data: any[]) =>
  console.log('[INFO]', JSON.stringify(data, undefined, 2));
