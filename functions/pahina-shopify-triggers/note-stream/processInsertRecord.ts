import { StreamRecord } from 'aws-lambda';
import { ProcessingError } from '../shared/utils/ProcessingError';

export const processInsertRecord = async (Record: StreamRecord) => {
  if (!Record.NewImage) {
    throw new ProcessingError('NewImage is empty, not an insert!');
  }

  return '[RECORD] insert processed';
};
