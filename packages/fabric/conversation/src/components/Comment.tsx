import * as React from 'react';
import * as distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import AkAvatar from '@atlaskit/avatar';
import AkComment, {
  CommentAuthor,
  CommentAction,
  CommentTime,
} from '@atlaskit/comment';
import { Editor as AkEditor, EditorProps } from '@atlaskit/editor-core';
import { WithProviders, ProviderFactory } from '@atlaskit/editor-common';
import { ResourcedReactions } from '@atlaskit/reactions';
import { ReactRenderer } from '@atlaskit/renderer';
import styled from 'styled-components';
import Editor from './Editor';
import { Comment as CommentType, User } from '../model';
import CommentContainer from '../containers/Comment';
import { HttpError } from '../api/HttpError';

/**
 * Props which are passed down from the parent Conversation/Comment
 */
export interface SharedProps {
  user?: User;
  comments?: CommentType[];

  // Dispatch
  onAddComment?: (
    conversationId: string,
    parentId: string,
    value: any,
    localId?: string,
  ) => void;
  onUpdateComment?: (
    conversationId: string,
    commentId: string,
    value: any,
  ) => void;
  onDeleteComment?: (conversationId: string, commentId: string) => void;
  onRevertComment?: (conversationId: string, commentId: string) => void;
  onCancelComment?: (conversationId: string, commentId: string) => void;
  onCancel?: () => void;

  // Provider
  dataProviders?: ProviderFactory;

  // Event Hooks
  onUserClick?: (user: User) => void;
  onRetry?: (localId?: string) => void;

  // Editor
  renderEditor?: (Editor: typeof AkEditor, props: EditorProps) => JSX.Element;

  containerId?: string;
}

export interface Props extends SharedProps {
  conversationId: string;
  comment: CommentType;
}

export interface State {
  isEditing?: boolean;
  isReplying?: boolean;
  lastDispatch?: {
    handler: any;
    args: any[];
  };
}

export const DeletedMessage = () => <em>Comment deleted by the author</em>;

const commentChanged = (oldComment: CommentType, newComment: CommentType) => {
  if (oldComment.state !== newComment.state) {
    return true;
  }

  if (oldComment.deleted !== newComment.deleted) {
    return true;
  }

  return false;
};

const Reactions: React.ComponentClass<React.HTMLAttributes<{}>> = styled.div`
  height: 20px;
  & > div {
    height: 20px;
  }
`;

export default class Comment extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
    };
  }

  shouldComponentUpdate(nextProps: Props, nextState: State) {
    const { isEditing, isReplying } = this.state;

    if (
      nextState.isEditing !== isEditing ||
      nextState.isReplying !== isReplying
    ) {
      return true;
    }

    if (commentChanged(this.props.comment, nextProps.comment)) {
      return true;
    }

    const { comments: oldComments = [] } = this.props;
    const { comments: newComments = [] } = nextProps;

    if (oldComments.length !== newComments.length) {
      return true;
    }

    if (
      newComments.some(newComment => {
        const [oldComment] = oldComments.filter(
          oldComment =>
            oldComment.commentId === newComment.commentId ||
            oldComment.localId === newComment.localId,
        );
        return commentChanged(oldComment, newComment);
      })
    ) {
      return true;
    }

    return false;
  }

  private dispatch = (dispatch: string, ...args: any[]) => {
    const handler = this.props[dispatch];

    if (handler) {
      handler.apply(handler, args);

      this.setState({
        lastDispatch: { handler: dispatch, args },
      });
    }
  };

  private onReply = () => {
    this.setState({
      isReplying: true,
    });
  };

  private onSaveReply = async (value: any) => {
    const { conversationId, comment } = this.props;

    this.dispatch('onAddComment', conversationId, comment.commentId, value);

    this.setState({
      isReplying: false,
    });
  };

  private onCancelReply = () => {
    this.setState({
      isReplying: false,
    });
  };

  private onDelete = () => {
    const { conversationId, comment } = this.props;

    this.dispatch('onDeleteComment', conversationId, comment.commentId);
  };

  private onEdit = () => {
    this.setState({
      isEditing: true,
    });
  };

  private onSaveEdit = async (value: any) => {
    const { conversationId, comment } = this.props;

    this.dispatch('onUpdateComment', conversationId, comment.commentId, value);

    this.setState({
      isEditing: false,
    });
  };

  private onCancelEdit = () => {
    this.setState({
      isEditing: false,
    });
  };

  private onRequestCancel = () => {
    const { comment, onCancel } = this.props;

    // Invoke optional onCancel hook
    if (onCancel) {
      onCancel();
    }

    this.dispatch('onRevertComment', comment.conversationId, comment.commentId);
  };

  private onRequestRetry = () => {
    const { lastDispatch } = this.state;
    const { onRetry, comment } = this.props;

    if (onRetry && comment.isPlaceholder) {
      return onRetry(comment.localId);
    }

    if (!lastDispatch) {
      return;
    }

    this.dispatch(lastDispatch.handler, ...lastDispatch.args);
  };

  /**
   * Username click handler - pass a User object, returns a handler which will invoke onUserClick with it
   * @param {User} user
   */
  private handleUserClick = (user: User) => () => {
    const { onUserClick } = this.props;
    if (onUserClick && typeof onUserClick === 'function') {
      onUserClick(user);
    }
  };

  private getContent() {
    const { comment, dataProviders, user, renderEditor } = this.props;
    const { isEditing } = this.state;

    if (comment.deleted) {
      return <DeletedMessage />;
    }

    if (isEditing) {
      return (
        <Editor
          defaultValue={comment.document.adf}
          isExpanded={true}
          isEditing={isEditing}
          onSave={this.onSaveEdit}
          onCancel={this.onCancelEdit}
          dataProviders={dataProviders}
          user={user}
          renderEditor={renderEditor}
        />
      );
    }

    return (
      <ReactRenderer
        document={comment.document.adf}
        dataProviders={dataProviders}
      />
    );
  }

  private renderComments() {
    const {
      comments,
      conversationId,
      user,
      onUserClick,
      dataProviders,
      onAddComment,
      onUpdateComment,
      onDeleteComment,
      onRevertComment,
      onRetry,
      onCancel,
      renderEditor,
      containerId,
    } = this.props;

    if (!comments || comments.length === 0) {
      return null;
    }

    return comments.map(child => (
      <CommentContainer
        key={child.localId}
        comment={child}
        user={user}
        conversationId={conversationId}
        onAddComment={onAddComment}
        onUpdateComment={onUpdateComment}
        onDeleteComment={onDeleteComment}
        onRevertComment={onRevertComment}
        onRetry={onRetry}
        onCancel={onCancel}
        onUserClick={onUserClick}
        dataProviders={dataProviders}
        renderComment={props => <Comment {...props} />}
        renderEditor={renderEditor}
        containerId={containerId}
      />
    ));
  }

  private renderEditor() {
    const { isReplying } = this.state;
    if (!isReplying) {
      return null;
    }

    const { dataProviders, user, renderEditor } = this.props;

    return (
      <Editor
        isExpanded={true}
        onCancel={this.onCancelReply}
        onSave={this.onSaveReply}
        dataProviders={dataProviders}
        user={user}
        renderEditor={renderEditor}
      />
    );
  }

  private getActions() {
    const { comment, user, dataProviders, containerId } = this.props;
    const { isEditing } = this.state;
    const canReply = !!user && !isEditing && !comment.deleted;

    if (!canReply) {
      return undefined;
    }

    const { createdBy, commentAri } = comment;
    let actions = [
      <CommentAction key="reply" onClick={this.onReply}>
        Reply
      </CommentAction>,
    ];

    if (createdBy && user && user.id === createdBy.id) {
      actions = [
        ...actions,
        <CommentAction key="edit" onClick={this.onEdit}>
          Edit
        </CommentAction>,
        <CommentAction key="delete" onClick={this.onDelete}>
          Delete
        </CommentAction>,
      ];
    }

    if (
      containerId &&
      commentAri &&
      dataProviders &&
      dataProviders.hasProvider('reactionsProvider') &&
      dataProviders.hasProvider('emojiProvider')
    ) {
      actions = [
        ...actions,
        <WithProviders
          key="reactions"
          providers={['emojiProvider', 'reactionsProvider']}
          providerFactory={dataProviders}
          renderNode={({ emojiProvider, reactionsProvider }) => (
            <Reactions>
              <ResourcedReactions
                containerAri={containerId}
                ari={commentAri}
                emojiProvider={emojiProvider}
                reactionsProvider={reactionsProvider}
              />
            </Reactions>
          )}
        />,
      ];
    }

    return actions;
  }

  render() {
    const { comment, onUserClick } = this.props;
    const { createdBy, state: commentState, error } = comment;
    const errorProps: {
      actions?: any[];
      message?: string;
    } = {};

    if (error) {
      errorProps.actions = [];

      if ((error as HttpError).canRetry) {
        errorProps.actions = [
          <CommentAction key="retry" onClick={this.onRequestRetry}>
            Retry
          </CommentAction>,
        ];
      }

      errorProps.actions = [
        ...errorProps.actions,
        <CommentAction key="cancel" onClick={this.onRequestCancel}>
          Cancel
        </CommentAction>,
      ];

      errorProps.message = error.message;
    }

    const comments = this.renderComments();
    const editor = this.renderEditor();

    return (
      <AkComment
        author={
          // Render with onClick/href if they're supplied
          onUserClick || createdBy.profileUrl ? (
            <CommentAuthor
              onClick={this.handleUserClick(createdBy)}
              href={createdBy.profileUrl || '#'}
            >
              {createdBy && createdBy.name}
            </CommentAuthor>
          ) : (
            // Otherwise just render text
            <CommentAuthor>{createdBy && createdBy.name}</CommentAuthor>
          )
        }
        avatar={<AkAvatar src={createdBy && createdBy.avatarUrl} />}
        time={
          <CommentTime>
            {distanceInWordsToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </CommentTime>
        }
        actions={this.getActions()}
        content={this.getContent()}
        isSaving={commentState === 'SAVING'}
        isError={commentState === 'ERROR'}
        errorActions={errorProps.actions}
        errorIconLabel={errorProps.message}
      >
        {editor || comments ? (
          <div>
            {comments}
            {editor}
          </div>
        ) : null}
      </AkComment>
    );
  }
}
