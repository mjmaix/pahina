import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { RouteComponentProps } from 'react-router';
import { Subscribe } from 'unstated';
import {
  Button,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
  Spinner,
  Alert,
} from 'reactstrap';
import Plain from 'slate-plain-serializer';

import './EditorScreen.css';
import './Screen.css';

import { handlePutPahinaNote } from '../events/eventActions';
import { NoteContainer, NoteState } from '../unstated';
import { logError } from '../shared';
import { EditorOnChange, Editor } from '../components/slate';
import { LinkedPageTitle } from '../components/Page';

interface State {
  title: string;
  saveLabel: string;
  submitting: boolean;
  linkedCase: {
    code: string;
    title: string;
    link: string;
  };
}

const initiaState = {
  title: 'Editor',
  submitting: false,
  saveLabel: 'Save',
  linkedCase: {
    title:
      'Commissioner of Internal Revenue Vs. Pilipinas Shell Petroleum Corporation/Commissioner of Internal Revenue Vs. Pilipinas Shell Petroleum Corporation and Petron Corporation',
    code:
      'G.R. Nos. 212761-62/G.R. Nos. 213473-74/G.R. Nos. 213538-39. July 31, 2018',
    link: 'http://www.chanrobles.com/cralaw/2018julydecisions.php?id=750',
  },
};
type Props = RouteComponentProps<{
  id: string;
}>;

export class EditorScreen extends Component<Props, State> {
  public readonly state: State;

  private note: NoteContainer;

  constructor(props: Props) {
    super(props);
    const { match } = this.props;
    this.state = {
      ...initiaState,
      title: `${match.params.id ? 'Edit' : 'Create'} case digest`,
    };
    this.note = new NoteContainer(match.params);
  }

  public render() {
    const { linkedCase, saveLabel, submitting, title } = this.state;

    return (
      <Subscribe to={[this.note]}>
        {(note: NoteContainer) => {
          if (!note || !note.state) {
            return null;
          }
          const { isReady, errorMessage, value, promotional } = note.state;
          if (!isReady) {
            return (
              <div className="pad-big">
                <Alert color="info">
                  <Spinner />
                  &nbsp;Retrieving document
                </Alert>
              </div>
            );
          }

          if (errorMessage) {
            return (
              <div className="pad-big">
                <Alert color="danger">{errorMessage}</Alert>
              </div>
            );
          }

          return (
            <div className="container">
              <h3 className="pad-big text-center">{title}</h3>
              <LinkedPageTitle
                title={linkedCase.title}
                sub={linkedCase.code}
                link={linkedCase.link}
              />
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
                    value={promotional || ''}
                    onChange={e => note.onChangePromotional(e.target.value)}
                  />
                </FormGroup>
                <FormGroup row>
                  <Col sm={12}>
                    <Editor
                      onChange={this.onChange}
                      placeholder="Write your digest here..."
                      value={value}
                    />
                  </Col>
                </FormGroup>
                <div className="Form-Buttons">
                  <Button
                    outline
                    active
                    disabled={submitting}
                    className="margin-tiny btn btn-primary btn-outline-info"
                    onClick={async () => {
                      await this.onClickSave(this.note.state);
                      alert('Saved');
                    }}
                  >
                    {saveLabel}
                  </Button>
                </div>
              </Form>
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
}
