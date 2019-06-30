import { Container } from 'unstated';
import { Value } from 'slate';
import uuid from 'uuid/v4';

import initialValue from './value.json';
import { PahinaNote } from '../shared/types.js';
import { handleGetPahinaNote, logError } from '../shared/index.js';

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
  isReady: true,
  errorMessage: null,
};

class NoteContainer extends Container<NoteState> {
  constructor(props: { id?: string }) {
    super();
    const { id } = props;
    if (id) {
      handleGetPahinaNote(id)
        .then(note => {
          if (note && note.getPahinaNote) {
            this.setNote(note.getPahinaNote);
            this.setState({ isReady: true });
          }
        })
        .catch(err => {
          logError(err);
          this.setState({
            errorMessage: 'Failed to load document',
            isReady: true,
          });
        });
    } else {
      this.state = initialState;
    }
  }

  public setId(id: string) {
    this.setState({ id: id });
  }

  public onChangePromotional(promotional: string) {
    this.setState({ promotional });
  }

  public onChangeValue(value: Value) {
    this.setState({ value });
  }

  public setNote(note: PahinaNote) {
    this.setState({
      value: note.value
        ? Value.fromJSON(JSON.parse(note.value))
        : initialState.value,
      id: note.id,
      promotional: note.promotional,
    });
  }

  public onReset() {
    this.setState(initialState);
  }
}

export { NoteContainer };
