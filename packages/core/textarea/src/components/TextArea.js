// @flow
import React, { Component } from 'react';
import { Theme } from '@atlaskit/theme';
import {
  withAnalyticsEvents,
  withAnalyticsContext,
  createAndFireEvent,
} from '@atlaskit/analytics-next';
import {
  name as packageName,
  version as packageVersion,
} from '../../package.json';
import { theme as defaultTheme, type ThemeProps } from '../theme';
import { TextAreaWrapper } from '../styled';
import TextareaElement from './TextAreaElement';

type Props = {
  /**
   * controls the appearance of the field.
   * subtle shows styling on hover.
   * none prevents all field styling.
   */
  appearance: 'standard' | 'subtle' | 'none',
  /** Set whether the fields should expand to fill available horizontal space. */
  isCompact?: boolean,
  /** Sets the field as uneditable, with a changed hover state. */
  isDisabled?: boolean,
  /** If true, prevents the value of the input from being edited. */
  isReadOnly?: boolean,
  /** Set required for form that the field is part of. */
  isRequired?: boolean,
  /** Sets styling to indicate that the input is invalid. */
  isInvalid?: boolean,
  /** The minimum number of rows of text to display */
  minimumRows: number,
  /** The value of the text-area. */
  value?: string | number,
  /** The default value of the text-area */
  defaultValue?: string | number,
  /** Handler to be called when the input is blurred */
  onBlur?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input changes. */
  onChange?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Handler to be called when the input is focused */
  onFocus?: (event: SyntheticInputEvent<HTMLTextAreaElement>) => void,
  /** Sets content text value to monospace */
  isMonospaced?: boolean,
  /**
   * Enables the resizing of the textarea:
   * auto: both directions.
   * horizontal: only along the x axis.
   * vertical: only along the y axis.
   * smart (default): vertically grows and shrinks the textarea automatically to wrap your input text.
   * none: explicitly disallow resizing on the textarea.
   */
  resize: 'auto' | 'vertical' | 'horizontal' | 'smart' | 'none',
  /** The theme function TextArea consumes to derive theming constants for use in styling its components */
  theme: ThemeProps => ThemeProps,
  /** Ref used to access the textarea dom element. NOTE we expose this via forwardRef,
   so you can also use the ref prop of this component to the same effect. */
  forwardedRef: (HTMLTextAreaElement | null) => void,
};
type State = {
  isFocused: boolean,
};

class TextAreaWithoutForwardRef extends Component<Props, State> {
  static defaultProps = {
    resize: 'smart',
    appearance: 'standard',
    isCompact: false,
    isRequired: false,
    isReadOnly: false,
    isDisabled: false,
    isInvalid: false,
    isMonospaced: false,
    minimumRows: 1,
    theme: defaultTheme,
    textareaRef: () => {},
  };

  state = {
    isFocused: false,
  };

  handleOnBlur = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onBlur } = this.props;
    this.setState({ isFocused: false });
    if (onBlur) {
      onBlur(event);
    }
  };

  handleOnFocus = (event: SyntheticInputEvent<HTMLTextAreaElement>) => {
    const { onFocus } = this.props;
    this.setState({ isFocused: true });
    if (onFocus) {
      onFocus(event);
    }
  };

  render() {
    const {
      //$FlowFixMe
      createAnalyticsEvent, //eslint-disable-line react/prop-types
      appearance,
      resize,
      isCompact,
      isDisabled,
      isInvalid,
      isReadOnly,
      isMonospaced,
      isRequired,
      minimumRows,
      theme,
      textareaRef,
      ...props
    } = this.props;

    const { isFocused } = this.state;

    return (
      <Theme values={theme}>
        {themeInContext => (
          <TextAreaWrapper
            {...themeInContext.textArea({ appearance, isCompact })}
            resize={resize}
            appearance={appearance}
            isDisabled={isDisabled}
            isReadOnly={isReadOnly}
            isMonospaced={isMonospaced}
            isFocused={isFocused}
            isInvalid={isInvalid}
            minimumRows={minimumRows}
          >
            <TextareaElement
              {...props}
              innerRef={forwardedRef}
              resize={resize}
              disabled={isDisabled}
              readOnly={isReadOnly}
              required={isRequired}
              onFocus={this.handleOnFocus}
              onBlur={this.handleOnBlur}
            />
          </TextAreaWrapper>
        )}
      </Theme>
    );
  }
}

// $FlowFixMe flow-bin v0.74.0 doesn't know about forwardRef.
const TextArea = React.forwardRef((props, ref) => (
  // Once Extract React Types is fixed to read from default exports we can
  // move textareaRef instantiation to after the spread.
  // as of now we do this to reduce the chance of users being misled into a breaking configuration
  // by our documentat.
  <TextAreaWithoutForwardRef forwardedRef={ref} {...props} />
));

export { TextArea as TextAreaWithoutAnalytics };
const createAndFireEventOnAtlaskit = createAndFireEvent('atlaskit');

export default withAnalyticsContext({
  componentName: 'textArea',
  packageName,
  packageVersion,
})(
  withAnalyticsEvents({
    onBlur: createAndFireEventOnAtlaskit({
      action: 'blurred',
      actionSubject: 'textArea',

      attributes: {
        componentName: 'textArea',
        packageName,
        packageVersion,
      },
    }),

    onFocus: createAndFireEventOnAtlaskit({
      action: 'focused',
      actionSubject: 'textArea',

      attributes: {
        componentName: 'textArea',
        packageName,
        packageVersion,
      },
    }),
  })(TextArea),
);
