import { Container } from 'unstated';
import { Value } from 'slate';
import Plain from 'slate-plain-serializer';
import uuid from 'uuid/v4';

import initialValue from './value.json';
import { handleGetPahinaNote, logError, PahinaNoteStatus } from '../shared/';

export interface NoteState {
  value: Value;
  id: string;
  promotional?: string | null;
  pahinaNoteAuthorId?: string | null;
  pahinaNoteCaseId?: string | null;
  isReady: boolean;
  errorMessage?: string | null;
}

const initialState = {
  id: uuid(),
  value: Value.fromJSON(initialValue),
  promotional: undefined,
  pahinaNoteCaseId: uuid(),
  isReady: false,
  errorMessage: null,
  status: PahinaNoteStatus.DRAFT,
};

type Props = {
  id?: string;
};

class NoteContainer extends Container<NoteState> {
  constructor(props: Props) {
    super();
    const { id } = props;
    if (id) {
      this.fetchData(id);
      this.state = { ...initialState };
    } else {
      this.state = { ...initialState, isReady: true };
    }
  }

  private fetchData = async (id: string) => {
    try {
      const resp = await handleGetPahinaNote(id);
      if (resp && resp.getPahinaNote) {
        const note = resp.getPahinaNote;
        const val = note.value
          ? Plain.deserialize(note.value)
          : initialState.value;
        const newNote = {
          value: val,
          id: note.id,
          promotional: note.promotional,
        };
        this.setState({ ...newNote, isReady: true });
      } else {
        this.setState({
          errorMessage: 'Document does not exist',
          isReady: true,
        });
      }
    } catch (err) {
      logError(err);
      this.setState({
        errorMessage: 'Failed to load document',
        isReady: true,
      });
    }
  };

  public setId = (id: string) => {
    this.setState({ id: id });
  };

  public onChangePromotional = (promotional: string) => {
    this.setState({ promotional });
  };

  public onChangeValue = (value: Value) => {
    this.setState({ value });
  };

  public onReset = () => {
    this.setState(initialState);
  };
}

export { NoteContainer };
