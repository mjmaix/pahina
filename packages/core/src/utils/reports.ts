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

export const logError = (...err: any[]) => console.error('[ERROR]', err);
export const logRecord = (rec: Record) => console.log('[RECORD]', rec);
export const logInfo = (...data: any[]) => console.log('[INFO]', data);
