import {
  UpdatePahinaNoteInput,
  CreatePahinaNoteInput,
  logInfo,
  handleGetPahinaNote,
  handleUpdatePahinaNote,
  logRecord,
  handleGetCurrentUser,
  handleCreatePahinaNote,
} from '../shared';
import { Subtract } from 'utility-types';

export const handlePutPahinaNote = async (
  data: Subtract<
    UpdatePahinaNoteInput & CreatePahinaNoteInput,
    { authorId: string }
  >,
) => {
  const user = await handleGetCurrentUser();
  const authorId = user.getUsername();

  try {
    logInfo('[START]', 'handlePutPahinaNote');
    const existing = await handleGetPahinaNote(data.id);
    if (!existing || !existing.getPahinaNote) {
      await handleCreatePahinaNote({ ...data, authorId });
    } else {
      await handleUpdatePahinaNote({ ...data, authorId });
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
