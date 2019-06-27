/* tslint:disable */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import {
  Editor,
  RenderMarkProps,
  RenderBlockProps,
  EventHook,
} from 'slate-react';

import {
  ButtonToolbar,
  Button,
  Form,
  FormGroup,
  Label,
  Col,
  Input,
} from 'reactstrap';
import {
  Value,
  Block,
  Mark,
  Node as SlateNode,
  Editor as CoreEditor,
  Document,
  Inline,
} from 'slate';

import './EditorScreen.css';
import './Screen.css';

import { Icon } from '../components/Icon';
import { TooltipWrapper } from '../components/HOCs/TooltipWrapper';

import initialValue from './value.json';
import { Hotkey } from '../components/slate';

interface State {
  value: Value;
  saveLabel: string;
  publishLabel: string;
  linkedCase: {
    code: string;
    title: string;
    link: string;
  };
}
type AcceptedParent = Document<any> | Block | Inline;
type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type OnChange = (change: { value: Value }) => any;

const DEFAULT_NODE = 'paragraph';

const plugins = [
  Hotkey('mod+b', (editor: CoreEditor) => editor.toggleMark('bold')),
  Hotkey('mod+i', (editor: CoreEditor) => editor.toggleMark('italic')),
  Hotkey('mod+u', (editor: CoreEditor) => editor.toggleMark('underline')),
  Hotkey('mod+`', (editor: CoreEditor) => editor.toggleMark('code')),
];

const initiaState = {
  saveLabel: 'Save',
  publishLabel: 'Publish to market',
  value: Value.fromJSON(initialValue),
  linkedCase: {
    title:
      'Commissioner of Internal Revenue Vs. Pilipinas Shell Petroleum Corporation/Commissioner of Internal Revenue Vs. Pilipinas Shell Petroleum Corporation and Petron Corporation',
    code:
      'G.R. Nos. 212761-62/G.R. Nos. 213473-74/G.R. Nos. 213538-39. July 31, 2018',
    link: 'http://www.chanrobles.com/cralaw/2018julydecisions.php?id=750',
  },
};
export class EditorScreen extends Component<{}, State> {
  private editor?: Editor;

  public readonly state: State = initiaState;

  public hasMark = (type: string) => {
    const { value } = this.state;
    return value.activeMarks.some((mark?: Mark) =>
      mark ? mark.type === type : false,
    );
  };

  public hasBlock = (type: string) => {
    const { value } = this.state;
    return value.blocks.some((node?: Block) =>
      node ? node.type === type : false,
    );
  };

  public ref = (editor: Editor) => {
    this.editor = editor;
  };

  public render() {
    const { value, linkedCase, saveLabel, publishLabel } = this.state;
    return (
      <div className="Editor-container">
        <h3 className="text-center">Editor - Case digest</h3>
        <div>
          <p className="Note-Title">{linkedCase.title}</p>
          <p className="Note-Code">{linkedCase.code}</p>
          <div className="Note-Link">
            <a href={linkedCase.link}>{linkedCase.link}</a>
          </div>
        </div>
        <Form>
          <FormGroup row>
            <Label for="Form-Summary" sm={2}>
              Summary (promotional)
            </Label>
            <Input
              type="textarea"
              name="summary"
              id="Form-Summary"
              placeholder="Add summary for potential buyers."
            />
          </FormGroup>
          <FormGroup row>
            <Col sm={12}>
              <div className="Editor-Toolbar-Outline">
                {this.renderEditorToolbar()}
              </div>
              <div className="Editor-Outline">
                <Editor
                  spellCheck
                  autoFocus
                  placeholder="Write your digest here..."
                  plugins={plugins}
                  ref={this.ref}
                  value={value}
                  onChange={this.onChange}
                  onKeyDown={this.onKeyDown}
                  renderBlock={this.renderBlock}
                  renderMark={this.renderMark}
                />
              </div>
            </Col>
          </FormGroup>
          <div className="Form-Buttons">
            <Button
              outline
              active
              className="Gap-reg btn btn-primary btn-outline-dark"
            >
              {publishLabel}
            </Button>
            <Button
              outline
              active
              className="Gap-reg btn btn-secondary btn-outline-info"
            >
              {saveLabel}
            </Button>
          </div>
        </Form>
      </div>
    );
  }

  private renderEditorToolbar = () => {
    return (
      <ButtonToolbar className="Editor-ButtonToolbar">
        {this.renderMarkButton('bold', 'format_bold')}
        {this.renderMarkButton('italic', 'format_italic')}
        {this.renderMarkButton('underlined', 'format_underlined')}
        {this.renderMarkButton('code', 'code')}
        {this.renderBlockButton('heading-one', 'looks_one')}
        {this.renderBlockButton('heading-two', 'looks_two')}
        {this.renderBlockButton('block-quote', 'format_quote')}
        {this.renderBlockButton('numbered-list', 'format_list_numbered')}
        {this.renderBlockButton('bulleted-list', 'format_list_bulleted')}
      </ButtonToolbar>
    );
  };

  public renderMarkButton = (type: string, icon: string) => {
    const isActive = this.hasMark(type);

    const id = `MarkButton_${type}`;
    return (
      <TooltipWrapper tooltipMessage={type}>
        <Button
          id={id}
          active={isActive}
          onMouseDown={(event: ClickEvent) => this.onClickMark(event, type)}
          className="Editor-Button"
        >
          <Icon>{icon}</Icon>
        </Button>
      </TooltipWrapper>
    );
  };

  public renderBlockButton = (type: string, icon: string) => {
    let isActive = this.hasBlock(type);

    if (['numbered-list', 'bulleted-list'].includes(type)) {
      const {
        value: { document, blocks },
      } = this.state;

      if (blocks.size > 0) {
        const parent: SlateNode | null = document.getParent(blocks.first().key);
        if (parent && (parent as AcceptedParent).type) {
          isActive = !!(
            this.hasBlock('list-item') &&
            parent &&
            (parent as any).type === type
          );
        }
      }
    }

    const id = `BlockButton_${type}`;

    return (
      <TooltipWrapper tooltipMessage={type}>
        <Button
          id={id}
          active={isActive}
          onMouseDown={(
            event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
          ) => this.onClickBlock(event, type)}
          className="Editor-Button"
        >
          <Icon>{icon}</Icon>
        </Button>
      </TooltipWrapper>
    );
  };

  public renderBlock = (
    props: RenderBlockProps,
    editor: CoreEditor,
    next: () => any,
  ) => {
    const { attributes, children, node } = props;

    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>;
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>;
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>;
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>;
      case 'list-item':
        return <li {...attributes}>{children}</li>;
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>;
      default:
        return next();
    }
  };

  public renderMark = (
    props: RenderMarkProps,
    editor: CoreEditor,
    next: () => any,
  ) => {
    const { children, mark, attributes } = props;

    switch (mark.type) {
      case 'bold':
        return <strong {...attributes}>{children}</strong>;
      case 'code':
        return <code {...attributes}>{children}</code>;
      case 'italic':
        return <em {...attributes}>{children}</em>;
      case 'underlined':
        return <u {...attributes}>{children}</u>;
      default:
        return next();
    }
  };

  public onChange: OnChange = ({ value }) => {
    this.cacheChanges(value, this.state.value);

    this.setState({ value });
  };

  public onKeyDown: EventHook = (
    event: Event,
    editor: CoreEditor,
    next: () => any,
  ) => {
    return next();
  };

  public onClickMark = (event: ClickEvent, type: string) => {
    event.preventDefault();
    if (this.editor) {
      this.editor.toggleMark(type);
    }
  };

  public onClickBlock = (event: ClickEvent, type: string) => {
    event.preventDefault();

    const { editor } = this;
    const { value } = editor as Editor;
    const { document } = value;

    if (editor) {
      // Handle everything but list buttons.
      if (type !== 'bulleted-list' && type !== 'numbered-list') {
        const isActive = this.hasBlock(type);
        const isList = this.hasBlock('list-item');

        if (isList) {
          editor
            .setBlocks(isActive ? DEFAULT_NODE : type)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        } else {
          editor.setBlocks(isActive ? DEFAULT_NODE : type);
        }
      } else {
        // Handle the extra wrapping required for list buttons.
        const isList = this.hasBlock('list-item');
        const isType = value.blocks.some((block?: Block) => {
          if (!block) {
            return false;
          }
          return !!document.getClosest(
            block.key,
            (parent: SlateNode) => (parent as AcceptedParent).type === type,
          );
        });

        if (isList && isType) {
          editor
            .setBlocks(DEFAULT_NODE)
            .unwrapBlock('bulleted-list')
            .unwrapBlock('numbered-list');
        } else if (isList) {
          editor
            .unwrapBlock(
              type === 'bulleted-list' ? 'numbered-list' : 'bulleted-list',
            )
            .wrapBlock(type);
        } else {
          editor.setBlocks('list-item').wrapBlock(type);
        }
      }
    }
  };

  private cacheChanges = debounce(
    (value: Value, oldValue: Value) => {
      // eslint-disable-next-line eqeqeq
      // if (value.document != oldValue.document) {
      //   const content = JSON.stringify(value.toJSON());
      // }
    },
    5 * 1000,
    {
      maxWait: 10 * 1000,
    },
  );
}
