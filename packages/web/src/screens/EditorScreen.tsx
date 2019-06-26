/* tslint:disable */
import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import {
  Editor,
  RenderMarkProps,
  RenderBlockProps,
  EventHook,
} from 'slate-react';
import { isKeyHotkey } from 'is-hotkey';
import { ButtonToolbar, Button } from 'reactstrap';
import {
  Value,
  Block,
  Mark,
  Node as SlateNode,
  Editor as CoreEditor,
} from 'slate';

import './EditorScreen.css';
import './Screen.css';
import { Cache } from '@pahina/core';

import { Icon } from '../components/Icon';
import { TooltipWrapper } from '../components/HOCs/TooltipWrapper';

import initialValue from './value.json';

interface State {
  value: Value;
}
type ClickEvent = React.MouseEvent<HTMLButtonElement, MouseEvent>;

const EDITOR_CACHE_KEY = 'editor_draft';

const DEFAULT_NODE = 'paragraph';

const isBoldHotkey = isKeyHotkey('mod+b');
const isItalicHotkey = isKeyHotkey('mod+i');
const isUnderlinedHotkey = isKeyHotkey('mod+u');
const isCodeHotkey = isKeyHotkey('mod+`');

const existingContent = JSON.parse(Cache.getItem(EDITOR_CACHE_KEY));

export class EditorScreen extends Component<{}, State> {
  private editor?: Editor;

  public readonly state: State = {
    value: Value.fromJSON(existingContent || initialValue),
  };

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
    return (
      <div className="Editor-container">
        <h3 className="text-center">Editor - Case digest</h3>
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
        <Editor
          spellCheck
          autoFocus
          placeholder="Write your digest here..."
          ref={this.ref}
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderBlock={this.renderBlock}
          renderMark={this.renderMark}
        />
      </div>
    );
  }

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
        const parent = document.getParent(blocks.first().key);
        // @ts-ignore
        isActive = this.hasBlock('list-item') && parent && parent.type === type;
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

  public onChange = ({ value }: State) => {
    this.cacheChanges(value, this.state.value);

    this.setState({ value });
  };

  public onKeyDown: EventHook = (
    event: Event,
    editor: CoreEditor,
    next: () => any,
  ) => {
    let mark;

    if (isBoldHotkey(event as KeyboardEvent)) {
      mark = 'bold';
    } else if (isItalicHotkey(event as KeyboardEvent)) {
      mark = 'italic';
    } else if (isUnderlinedHotkey(event as KeyboardEvent)) {
      mark = 'underlined';
    } else if (isCodeHotkey(event as KeyboardEvent)) {
      mark = 'code';
    } else {
      return next();
    }

    event.preventDefault();
    editor.toggleMark(mark);
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
          return !!document.getClosest(block.key, (parent: SlateNode) =>
            // @ts-ignore
            parent && parent.type ? parent.type === type : false,
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
      if (value.document != oldValue.document) {
        const content = JSON.stringify(value.toJSON());
        Cache.setItem(EDITOR_CACHE_KEY, content);
      }
    },
    5 * 1000,
    {
      maxWait: 10 * 1000,
    },
  );
}
