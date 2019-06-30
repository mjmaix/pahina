import {
  UpdatePahinaNoteInput,
  CreatePahinaNoteInput,
  logInfo,
  handleGetPahinaNote,
  handleCreatePahinaNote,
  handleUpdatePahinaNote,
  logRecord,
  handleGetCurrentUser,
} from '../shared';

export const handlePutPahinaNote = async (
  data: UpdatePahinaNoteInput & CreatePahinaNoteInput,
) => {
  const user = await handleGetCurrentUser();

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
