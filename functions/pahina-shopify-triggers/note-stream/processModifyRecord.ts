import { StreamRecord } from 'aws-lambda';

import { ProcessingError } from '../../shared/utils/ProcessingError';
import { pretty } from '../../shared/utils/simpleUtils';

import { publishProduct } from './helpers/actionPublish';
import { PahinaNoteStatus } from './helpers/constants';

export const processModifyRecord = async (Record: StreamRecord) => {
  if (!Record.NewImage || !Record.OldImage) {
    throw new ProcessingError('NewImage or OldImage is empty, not an edit!');
  }

  const note = (Record.NewImage as unknown) as NoteRecord;
  const oldNote = (Record.OldImage as unknown) as NoteRecord;

  const oldStatus = oldNote.status.S;
  const newStatus = note.status.S;
  const { DRAFT, PUBLISHED, PUBLISHED_EDITED, UNLISTED } = PahinaNoteStatus;
  if (oldStatus === DRAFT && newStatus === PUBLISHED) {
    console.log('[INFO] Publish Record to Shopify', pretty(Record));
    await publishProduct(note);
  } else if (oldStatus === PUBLISHED_EDITED && newStatus === PUBLISHED) {
    console.log('[INFO] Update Record on Shopify', pretty(Record));
    // modify old product
  } else if (
    (oldStatus === PUBLISHED || oldStatus === PUBLISHED_EDITED) &&
    newStatus === UNLISTED
  ) {
    console.log('[INFO] Unlist Record on Shopify', pretty(Record));
    // remove old product on publish channel, or make in unavailable
  }

  return '[RECORD] edit processed';
};
