// @flow
import React, { type ComponentType } from 'react';

type Props = {
  Component: ComponentType<*>,
  language: string,
  source: string,
};

type State = {
  sourceIsVisible: boolean,
};

export default class Example extends React.Component<Props, State> {
  static defaultProps = {
    language: 'javascript',
  }
  state = {
    sourceIsVisible: false,
  }

  toggleSource = () => {
    this.setState({
      sourceIsVisible: !this.state.sourceIsVisible,
    });
  }

  render() {
    const { Component, language, source } = this.props;
    const { sourceIsVisible } = this.state;
    return (
      <div>
        <Component />
        {sourceIsVisible ? (
          <div>
            {`${language}:`}
            <pre style={{ width: '100%', overflowX: 'scroll' }}>{source}</pre>
            <button onClick={this.toggleSource}>Hide Example Source</button>
          </div>
        ) : (
          <div>
            <button onClick={this.toggleSource}>Show Example Source</button>
          </div>
        )}
      </div>
    );
  }
}
