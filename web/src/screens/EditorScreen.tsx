import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import { Button, Form, FormGroup, Label, Col, Input } from 'reactstrap';
import Plain from 'slate-plain-serializer';

import './EditorScreen.css';
import './Screen.css';

import { handlePutPahinaNote } from '../events/eventActions';
import { NoteContainer, NoteState, SystemContainer } from '../unstated';
import { logError } from '../shared';
import { EditorOnChange, Editor } from '../components/slate';
import { LinkedPageTitle } from '../components/Page';
import queryString from 'query-string';

interface State {
  title: string;
  saveLabel: string;
  submitting: boolean;
  newCase: {
    id?: string | null;
    code?: string | null;
    title?: string | null;
    date?: string | null;
    link?: string | null;
  };
}

type Props = RouteComponentProps<{
  id: string;
}>;

const initiaState = {
  title: 'Editor',
  submitting: false,
  saveLabel: 'Save',
};

export class EditorScreen extends Component<Props, State> {
  public readonly state: State;

  private note: NoteContainer;

  constructor(props: Props) {
    super(props);
    const { match, location } = this.props;
    const qParams = queryString.parse(location.search);
    this.state = {
      ...initiaState,
      title: `${match.params.id ? 'Edit' : 'Create'} case digest`,
      newCase: {
        id: (qParams.caseId || null) as string | null,
        code: (qParams.caseCode || null) as string | null,
        title: (qParams.caseTitle || null) as string | null,
        link: (qParams.caseLink || null) as string | null,
        date: (qParams.caseDate || null) as string | null,
      },
    };
    this.note = new NoteContainer(match.params);
  }

  public render() {
    const { title } = this.state;

    return (
      <Subscribe to={[this.note, SystemContainer]}>
        {(note: NoteContainer, system: SystemContainer) => {
          if (!note || !note.state) {
            return null;
          }
          const { isReady, errorMessage } = note.state;
          console.log('isReady', isReady);
          console.log('errorMessage', errorMessage);

          if (!isReady) {
            const message = 'Retrieving document';
            if (system.state.loadingMessage !== message) {
              system.setLoadingMessage(message);
            }
          } else {
            if (system.state.loadingMessage !== null) {
              system.setLoadingMessage(null);
            }
          }
          if (errorMessage) {
            if (system.state.errorMessage !== errorMessage) {
              system.setErrorMessage(errorMessage);
            }
          }

          let lCase = this.getCase(note);
          return (
            <div className="container">
              <h3 className="pad-big text-center">{title}</h3>
              {this.renderCase(lCase)}
              {this.renderForm(note)}
            </div>
          );
        }}
      </Subscribe>
    );
  }

  public onChange: EditorOnChange = ({ value }) => {
    this.debouncedSave({ ...this.note.state, value }, this.note.state);

    this.note.onChangeValue(value);
  };

  private onClickSave = async (note: NoteState, oldNote?: NoteState) => {
    let proceed = true;
    if (oldNote) {
      const value = note.value;
      const oldValue = oldNote.value;

      // eslint-disable-next-line eqeqeq
      const docChanged = value.document != oldValue.document;
      const promoChanged = note.promotional !== oldNote.promotional;

      proceed = docChanged || promoChanged;
    }

    if (!proceed) {
      return;
    }
    try {
      this.setState({ submitting: true });
      await handlePutPahinaNote({
        ...note,
        value: Plain.serialize(note.value),
      });
    } catch (err) {
      logError(`[ERROR] onClickSave ${err}`);
      throw err;
    } finally {
      this.setState({ submitting: false });
    }
  };

  private debouncedSave = debounce(this.onClickSave, 5 * 1000, {
    maxWait: 10 * 1000,
  });

  private renderForm(note: NoteContainer) {
    return (
      <Form>
        <FormGroup row>
          <Label for="Form-Summary" sm={4}>
            Promotional message
          </Label>
          <Input
            type="textarea"
            name="summary"
            id="Form-Summary"
            placeholder="Add summary for potential buyers."
            value={note.state.promotional || ''}
            onChange={e => note.onChangePromotional(e.target.value)}
          />
        </FormGroup>
        <FormGroup row>
          <Col sm={12}>
            <Editor
              onChange={this.onChange}
              placeholder="Write your digest here..."
              value={note.state.value}
            />
          </Col>
        </FormGroup>
        <div className="Form-Buttons">
          <Button
            outline
            active
            disabled={this.state.submitting}
            className="margin-tiny btn btn-primary btn-outline-info"
            onClick={async () => {
              await this.onClickSave(this.note.state);
              alert('Saved');
            }}
          >
            {this.state.saveLabel}
          </Button>
        </div>
      </Form>
    );
  }

  private renderCase(lCase: {
    id?: string | null | undefined;
    code?: string | null | undefined;
    title?: string | null | undefined;
    date?: string | null | undefined;
    link?: string | null | undefined;
  }) {
    return (
      <LinkedPageTitle
        title={lCase.title || 'Case title not provided'}
        sub={lCase.code}
        link={lCase.link}
      />
    );
  }

  private getCase(note: NoteContainer) {
    let lCase;
    if (note.state.case) {
      lCase = note.state.case;
    } else {
      lCase = this.state.newCase;
    }
    return lCase;
  }
}
