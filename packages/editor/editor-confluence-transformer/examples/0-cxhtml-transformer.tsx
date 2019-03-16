import styled from 'styled-components';
import * as React from 'react';
import { Component } from 'react';
import { pd } from 'pretty-data';
import Button, { ButtonGroup } from '@findable/button';
import {
  Editor,
  EditorContext,
  WithEditorActions,
} from '@findable/editor-core';
import {
  storyMediaProviderFactory,
  storyContextIdentifierProviderFactory,
  macroProvider,
} from '@findable/editor-test-helpers';
import { mention, emoji, taskDecision } from '@findable/util-data-test';
import { MockActivityResource } from '@findable/activity/dist/es5/support';
import Spinner from '@findable/spinner';
import { TitleInput } from '@findable/editor-core/example-helpers/PageElements';

import {
  CODE_MACRO,
  JIRA_ISSUE,
  JIRA_ISSUES_LIST,
  PANEL_MACRO,
  INLINE_EXTENSION,
  EXTENSION,
  BODIED_EXTENSION,
  BODIED_NESTED_EXTENSION,
  DATE,
} from '../example-helpers/cxhtml-test-data';
import { ConfluenceTransformer } from '../src';

// tslint:disable-next-line:variable-name
export const Content = styled.div`
  padding: 0 20px;
  height: 100%;
  background: #fff;
  box-sizing: border-box;
`;
Content.displayName = 'Content';

// tslint:disable-next-line:no-console
const analyticsHandler = (actionName, props) => console.log(actionName, props);

// tslint:disable-next-line:variable-name
const SaveAndCancelButtons = props => (
  <ButtonGroup>
    <Button
      appearance="primary"
      onClick={() =>
        props.editorActions
          .getValue()
          // tslint:disable-next-line:no-console
          .then(value => console.log(value.toJSON()))
      }
    >
      Publish
    </Button>
    <Button
      appearance="subtle"
      // tslint:disable-next-line:jsx-no-lambda
      onClick={() => props.editorActions.clear()}
    >
      Close
    </Button>
  </ButtonGroup>
);

const providers = {
  emojiProvider: emoji.storyData.getEmojiResource({
    uploadSupported: true,
  }),
  mentionProvider: Promise.resolve(mention.storyData.resourceProvider),
  activityProvider: Promise.resolve(new MockActivityResource()),
  macroProvider: Promise.resolve(macroProvider),
  taskDecisionProvider: Promise.resolve(
    taskDecision.getMockTaskDecisionResource(),
  ),
  contextIdentifierProvider: storyContextIdentifierProviderFactory(),
};
const mediaProvider = storyMediaProviderFactory();

type ExampleProps = {
  onChange: Function;
};

type ExampleState = {
  input: string;
  output: string;
};

class Example extends Component<ExampleProps, ExampleState> {
  state = {
    input: '',
    output: '',
  };

  refs: {
    input: HTMLTextAreaElement;
  };

  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.input !== this.state.input ||
      nextState.output !== this.state.output
    );
  }

  render() {
    return (
      <div ref="root">
        <fieldset style={{ marginTop: 20, marginBottom: 20 }}>
          <legend>Input</legend>
          <textarea
            style={{
              boxSizing: 'border-box',
              border: '1px solid lightgray',
              fontFamily: 'monospace',
              padding: 10,
              width: '100%',
              height: 100,
            }}
            ref="input"
          />
          <button onClick={this.handleImportClick}>Import</button>
          <button onClick={this.handleInsertCodeClick}>Code</button>
          <button onClick={this.handleInsertPanelClick}>Panel</button>
          <button onClick={this.handleInsertJiraIssueClick}>JIRA Issue</button>
          <button onClick={this.handleInsertJiraIssuesListClick}>
            JIRA Issues List
          </button>
          <button onClick={this.handleInsertInlineExtensionClick}>
            Inline Extension
          </button>
          <button onClick={this.handleInsertExtensionClick}>Extension</button>
          <button onClick={this.handleInsertBodiedExtensionClick}>
            Bodied Extension
          </button>
          <button onClick={this.handleInsertNestedMacroClick}>
            Nested Extensions
          </button>
          <button onClick={this.handleInsertDateClick}>Date</button>
        </fieldset>
        <Content>
          <EditorContext>
            <WithEditorActions
              // tslint:disable-next-line:jsx-no-lambda
              render={actions => (
                <Editor
                  appearance="full-page"
                  analyticsHandler={analyticsHandler}
                  allowCodeBlocks={true}
                  allowLists={true}
                  allowTextColor={true}
                  allowTables={{
                    allowColumnResizing: true,
                    allowMergeCells: true,
                    allowBackgroundColor: true,
                    allowNumberColumn: true,
                  }}
                  allowJiraIssue={true}
                  allowUnsupportedContent={true}
                  allowPanel={true}
                  allowExtension={true}
                  allowConfluenceInlineComment={true}
                  allowDate={true}
                  {...providers}
                  media={{ provider: mediaProvider, allowMediaSingle: true }}
                  // tslint:disable-next-line:jsx-no-lambda
                  contentTransformerProvider={schema =>
                    new ConfluenceTransformer(schema)
                  }
                  placeholder="Write something..."
                  shouldFocus={false}
                  onChange={editorView => this.props.onChange(actions)}
                  defaultValue={this.state.input}
                  key={this.state.input}
                  contentComponents={
                    // tslint:disable-next-line:jsx-no-lambda
                    <TitleInput innerRef={ref => ref && ref.focus()} />
                  }
                  primaryToolbarComponents={
                    <WithEditorActions
                      // tslint:disable-next-line:jsx-no-lambda
                      render={actions => (
                        <SaveAndCancelButtons editorActions={actions} />
                      )}
                    />
                  }
                />
              )}
            />
          </EditorContext>
        </Content>
      </div>
    );
  }

  private handleImportClick = () =>
    this.setState({ input: this.refs.input.value });
  private handleInsertCodeClick = () => this.setState({ input: CODE_MACRO });
  private handleInsertJiraIssueClick = () =>
    this.setState({ input: JIRA_ISSUE });
  private handleInsertJiraIssuesListClick = () =>
    this.setState({ input: JIRA_ISSUES_LIST });
  private handleInsertPanelClick = () => this.setState({ input: PANEL_MACRO });
  private handleInsertInlineExtensionClick = () =>
    this.setState({ input: INLINE_EXTENSION });
  private handleInsertExtensionClick = () =>
    this.setState({ input: EXTENSION });
  private handleInsertBodiedExtensionClick = () =>
    this.setState({ input: BODIED_EXTENSION });
  private handleInsertNestedMacroClick = () =>
    this.setState({ input: BODIED_NESTED_EXTENSION });
  private handleInsertDateClick = () => this.setState({ input: DATE });
}

export type ExampleWrapperProps = {};
export type ExampleWrapperState = {
  cxhtml?: string;
  story?: any;
  prettify?: boolean;
  isMediaReady?: boolean;
};

export default class ExampleWrapper extends Component<
  ExampleWrapperProps,
  ExampleWrapperState
> {
  state: ExampleWrapperState = {
    cxhtml: '',
    prettify: true,
    isMediaReady: true,
  };

  handleChange = editorActions => {
    this.setState({ isMediaReady: false });

    // tslint:disable-next-line:no-console
    console.log('Change');

    editorActions.getValue().then(value => {
      // tslint:disable-next-line:no-console
      console.log('Value has been resolved', value);
      this.setState({
        isMediaReady: true,
        cxhtml: value,
      });
    });
  };

  togglePrettify = () => {
    this.setState({ prettify: !this.state.prettify });
  };

  render() {
    const xml = this.state.prettify
      ? pd.xml(this.state.cxhtml || '')
      : this.state.cxhtml || '';

    return (
      <div ref="root">
        <Example onChange={this.handleChange} />

        <fieldset style={{ marginTop: 20 }}>
          <legend>
            CXHTML output (
            <input
              type="checkbox"
              checked={this.state.prettify}
              onChange={this.togglePrettify}
            />
            <span onClick={this.togglePrettify} style={{ cursor: 'pointer' }}>
              {' '}
              prettify
            </span>
            )
          </legend>
          {this.state.isMediaReady ? (
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
              {xml}
            </pre>
          ) : (
            <div style={{ padding: 20 }}>
              <Spinner size="large" />
            </div>
          )}
        </fieldset>
      </div>
    );
  }
}
