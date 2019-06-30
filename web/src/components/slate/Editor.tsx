import React, { Component } from 'react';
import {
  Value,
  Editor as CoreEditor,
  Node as SlateNode,
  Mark,
  Document,
  Block,
  Inline,
} from 'slate';
import {
  EventHook,
  RenderMarkProps,
  RenderBlockProps,
  Editor as SlateEditor,
} from 'slate-react';
import { ButtonToolbar, Button } from 'reactstrap';

import './Editor.css';
import { Hotkey } from './HotKeyPlugin';
import { Icon } from '../Icon';
import { TooltipWrapper } from '../HOCs/TooltipWrapper';

export type EditorOnChange = (change: { value: Value }) => any;
type EditorClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;
type AcceptedParent = Document<any> | Block | Inline;

export interface Props {
  value: Value;
  onChange: EditorOnChange;
  placeholder: string;
}

const DEFAULT_NODE = 'paragraph';

const plugins = [
  Hotkey('mod+b', (editor: CoreEditor) => editor.toggleMark('bold')),
  Hotkey('mod+i', (editor: CoreEditor) => editor.toggleMark('italic')),
  Hotkey('mod+u', (editor: CoreEditor) => editor.toggleMark('underline')),
  Hotkey('mod+`', (editor: CoreEditor) => editor.toggleMark('code')),
];

class Editor extends Component<Props> {
  private editor?: SlateEditor | null;

  public render() {
    const { value, onChange, placeholder } = this.props;
    return (
      <div>
        <div className="Editor-Toolbar-Outline">
          {this.renderEditorToolbar()}
        </div>
        <div className="Editor-Outline">
          <SlateEditor
            spellCheck
            autoFocus
            placeholder={placeholder}
            plugins={plugins}
            ref={this.ref}
            value={value}
            onChange={onChange}
            onKeyDown={this.onKeyDown}
            renderBlock={this.renderBlock}
            renderMark={this.renderMark}
          />
        </div>
      </div>
    );
  }

  private ref = (editor: SlateEditor | null) => {
    this.editor = editor;
  };

  public onKeyDown: EventHook = (
    event: Event,
    editor: CoreEditor,
    next: () => any,
  ) => {
    return next();
  };

  public onClickMark = (event: EditorClickEvent, type: string) => {
    event.preventDefault();
    if (this.editor) {
      this.editor.toggleMark(type);
    }
  };

  public onClickBlock = (event: EditorClickEvent, type: string) => {
    event.preventDefault();

    const { editor } = this;
    if (!editor) {
      return;
    }
    const { value } = editor;
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

  private hasMark = (type: string) => {
    const { value } = this.props;
    return value.activeMarks.some((mark?: Mark) =>
      mark ? mark.type === type : false,
    );
  };

  private hasBlock = (type: string) => {
    const { value } = this.props;
    return value.blocks.some((node?: Block) =>
      node ? node.type === type : false,
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
          onMouseDown={(event: EditorClickEvent) =>
            this.onClickMark(event, type)
          }
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
      } = this.props;

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
}

export { Editor };
