import * as React from 'react';
import * as PropTypes from 'prop-types';
import EditorActions from '../../actions';

export default class EditorContext extends React.Component<{}, {}> {
  static childContextTypes = {
    editorActions: PropTypes.object,
  };

  private editorActions: EditorActions;

  constructor(props) {
    super(props);
    this.editorActions = new EditorActions();
  }

  getChildContext() {
    return {
      editorActions: this.editorActions,
    };
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
