// @flow
import React, { Component, type Node } from 'react';
import styled, { css } from 'styled-components';
import uuid from 'uuid';
import { colors } from '@atlaskit/theme';

const sizes = {
  small: '16px',
  medium: '24px',
  large: '32px',
  xlarge: '48px',
};

// NOTE: spanStyles is exported for testing
// Once styled-components is bumped > 2.X.X we can enjoy `toHaveStyleRule` from
// https://github.com/styled-components/jest-styled-components#tohavestylerule

const getSize = props => {
  if (props.size) {
    return `height: ${sizes[props.size]}; width: ${sizes[props.size]};`;
  }
  return null;
};

export const spanStyles = css`
  ${getSize} color: ${p => p.primaryColor || 'currentColor'};
  display: inline-block;
  fill: ${p => p.secondaryColor || colors.background};
  line-height: 1;

  > svg {
    ${getSize} max-height: 100%;
    max-width: 100%;
    overflow: hidden;
    vertical-align: bottom;
  }
  /* Stop-color doesn't properly apply in chrome when the inherited/current color changes.
   * We have to initially set stop-color to inherit (either via DOM attribute or an initial CSS
   * rule) and then override it with currentColor for the color changes to be picked up.
   */
  stop {
    stop-color: currentColor;
  }
`;

export const IconWrapper = styled.span`
  ${spanStyles};
`;

type Props = {
  /** Glyph to show by Icon component (not required when you import a glyph directly) */
  glyph?: () => Node,
  /** More performant than the glyph prop, but potentially dangerous if the SVG string hasn't
   been "sanitised" */
  dangerouslySetGlyph?: string,
  /** String to apply as the SVG title element */
  label: string,
  /** onClick handler for the icon element */
  onClick?: () => mixed,
  /** For primary colour for icons */
  primaryColor?: string,
  /** For secondary colour for 2-color icons. Set to inherit to control this via "fill" in CSS */
  secondaryColor?: string,
  /** Control the size of the icon */
  size?: 'small' | 'medium' | 'large' | 'xlarge',
};

class Icon extends Component<Props, {}> {
  static defaultProps = {
    onClick: () => {},
  };

  /* Icons need unique gradient IDs across instances for different gradient definitions to work
   * correctly.
   * A step in the icon build process replaces linear gradient IDs and their references in paths
   * to a placeholder string so we can replace them with a dynamic ID here.
   * Replacing the original IDs with placeholders in the build process is more robust than not
   * using placeholders as we do not have to rely on regular expressions to find specific element
   * to replace.
   */
  static insertDynamicGradientID(svgStr) {
    const id = uuid();

    const replacedSvgStr = svgStr
      .replace(/id="([^"]+)-idPlaceholder"/g, `id=$1-${id}`)
      .replace(
        /fill="url\(#([^"]+)-idPlaceholder\)"/g,
        `fill="url(#$1-${id})"`,
      );

    return replacedSvgStr;
  }

  render() {
    const {
      glyph: Glyph,
      dangerouslySetGlyph,
      onClick,
      primaryColor,
      secondaryColor,
      size,
    } = this.props;

    // handling the glyphs as strings
    if (dangerouslySetGlyph) {
      return (
        <IconWrapper
          onClick={onClick}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
          size={size}
          role="img"
          aria-label={this.props.label}
          dangerouslySetInnerHTML={{
            __html: Icon.insertDynamicGradientID(dangerouslySetGlyph),
          }}
        />
      );
    }
    // handling the glyphs when passed through as functions
    return (
      <IconWrapper
        onClick={onClick}
        primaryColor={primaryColor}
        secondaryColor={secondaryColor}
        size={size}
        role="img"
        aria-label={this.props.label}
      >
        {Glyph ? <Glyph role="presentation" /> : null}
      </IconWrapper>
    );
  }
}

const size = Object.keys(sizes).reduce(
  (p, c) => Object.assign(p, { [c]: c }),
  {},
);

export { size };
export default Icon;
