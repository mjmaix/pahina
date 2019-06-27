import {
  AppCognitoUser,
  UpdatePahinaNoteInput,
  CreatePahinaNoteInput,
  logInfo,
  handleGetPahinaNote,
  handleCreatePahinaNote,
  handleUpdatePahinaNote,
  logRecord,
} from '../shared';

export const handlePutPahinaNote = async (
  user: AppCognitoUser,
  data: UpdatePahinaNoteInput & CreatePahinaNoteInput,
) => {
  try {
    logInfo('[START]', 'handlePutPahinaNote');
    const existing = await handleGetPahinaNote(data.id);
    if (!existing || !existing.getPahinaNote) {
      await handleCreatePahinaNote(user, data);
    } else {
      await handleUpdatePahinaNote(user, data);
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
