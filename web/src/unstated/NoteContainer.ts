import { Container } from 'unstated';
import { Value } from 'slate';
import uuid from 'uuid/v4';

import initialValue from './value.json';

export interface NoteState {
  value: Value;
  id: string;
  promotional?: string;
  pahinaNoteAuthorId?: string | null;
  pahinaNoteCaseId?: string | null;
}

const initialState = {
  id: uuid(),
  value: Value.fromJSON(initialValue),
  promotional: undefined,
  pahinaNoteCaseId: 'mockPahinaNoteCaseId',
};

class NoteContainer extends Container<NoteState> {
  state: NoteState = initialState;

  public onChangePromotional(promotional: string) {
    this.setState({ promotional });
  }

  public onChangeValue(value: Value) {
    this.setState({ value });
  }

  public onReset() {
    this.setState(initialState);
  }
}

export { NoteContainer };
