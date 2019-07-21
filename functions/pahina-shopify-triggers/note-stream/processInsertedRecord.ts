import { StreamRecord } from 'aws-lambda';
import { ProcessingError } from './utils/ProcessingError';

export const processInsertedRecord = async (Record: StreamRecord) => {
  if (!Record.NewImage) {
    throw new ProcessingError('NewImage is empty, not an insert!');
  }

  return '[RECORD] insert processed';
};