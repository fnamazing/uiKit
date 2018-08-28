// @flow
import React, { createContext, type Node } from 'react';

type Props = {
  children: Node,
};

type State = {
  currentChildren: Node,
};

const { Consumer, Provider } = createContext({
  isOpen: true,
  onExited: undefined,
});

// checks if children exist and are truthy
const hasChildren = children =>
  React.Children.count(children) > 0 &&
  React.Children.map(children, child => !!child).filter(Boolean).length > 0;

class Transition extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    const { currentChildren: previousChildren } = state;
    const exiting =
      hasChildren(previousChildren) && !hasChildren(props.children);
    return {
      currentChildren: exiting ? previousChildren : props.children,
    };
  }

  state = {
    currentChildren: undefined,
  };

  onExited = () => {
    this.setState({
      currentChildren: this.props.children,
    });
  };

  render() {
    return (
      <Provider
        value={{
          onExited: this.onExited,
          isOpen: hasChildren(this.props.children),
        }}
      >
        {this.state.currentChildren}
      </Provider>
    );
  }
}

export const ModalTransitionConsumer = Consumer;

export default Transition;
