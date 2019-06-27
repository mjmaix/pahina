import {
  AppCognitoUser,
  UpdatePahinaNoteInput,
  CreatePahinaNoteInput,
} from '@pahina/core/types';
import {
  handleGetPahinaNote,
  logInfo,
  logRecord,
  handleCreatePahinaNote,
  handleUpdatePahinaNote,
} from '@pahina/core';

export const handlePutPahinaNote = async (
  user: AppCognitoUser,
  data: UpdatePahinaNoteInput & CreatePahinaNoteInput,
) => {
  try {
    logInfo('[START]', 'handlePutPahinaNote');
    const existing = await handleGetPahinaNote(data.id);
    if (!existing || !existing.getPahinaNote) {
      const resp = await handleCreatePahinaNote(user, data);
    } else {
      const resp = await handleUpdatePahinaNote(user, data);
    }
  } catch (e) {
    logRecord({
      name: 'PutNoteError',
      attributes: {
        error: e.message,
      },
    });
  }
};
