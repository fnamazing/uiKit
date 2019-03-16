import EditorMoreIcon from '@findable/icon/glyph/editor/more';
import { borderRadius, colors } from '@findable/theme';
import Tooltip from '@findable/tooltip';
import * as cx from 'classnames';
import * as React from 'react';
import { style } from 'typestyle';
import { messages } from './i18n';
import { FormattedMessage } from 'react-intl';

const moreEmojiContainerStyle = style({ display: 'flex' });

const moreButtonStyle = style({
  opacity: 0,
  outline: 'none',
  backgroundColor: 'transparent',
  border: 0,
  borderRadius: `${borderRadius()}px`,
  cursor: 'pointer',
  margin: '4px 4px 4px 0',
  padding: '4px',
  width: '38px',
  verticalAlign: 'top',
  $nest: {
    '&:hover': {
      backgroundColor: colors.N30A,
    },
  },
});

const separatorStyle = style({
  backgroundColor: colors.N30A,
  margin: '8px 8px 8px 4px',
  width: '1px',
  height: '60%',
  display: 'inline-block',
});

export type CommonProps<T> = {
  container?: T;
  button?: T;
};

export type Props = {
  onClick?: React.MouseEventHandler<HTMLElement>;
  style?: CommonProps<React.CSSProperties>;
  className?: CommonProps<string>;
};

export class ShowMore extends React.PureComponent<Props> {
  static defaultProps = {
    className: {},
    style: {},
  };

  render() {
    const { style, onClick, className: classNameProp } = this.props;

    return (
      <div
        className={cx(moreEmojiContainerStyle, classNameProp!.container)}
        style={style!.container}
      >
        <div className={separatorStyle} />
        <FormattedMessage {...messages.moreEmoji}>
          {text => (
            <Tooltip content={text}>
              <button
                className={cx(moreButtonStyle, classNameProp!.button)}
                style={style!.button}
                onMouseDown={onClick}
              >
                <EditorMoreIcon label="More" />
              </button>
            </Tooltip>
          )}
        </FormattedMessage>
      </div>
    );
  }
}
