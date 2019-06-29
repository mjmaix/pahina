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
    const parsedData = { ...data, value: JSON.stringify(data.value) };
    if (!existing || !existing.getPahinaNote) {
      await handleCreatePahinaNote(user, parsedData);
    } else {
      await handleUpdatePahinaNote(user, parsedData);
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
