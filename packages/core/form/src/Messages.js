// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { typography, gridSize, math, colors } from '@atlaskit/theme';
import ErrorIcon from '@atlaskit/icon/glyph/error';
import SuccessIcon from '@atlaskit/icon/glyph/editor/success';

const Message = styled.div`
  ${typography.h200} font-weight: normal;
  color: ${props => {
    if (props.error) {
      return colors.R400;
    } else if (props.valid) {
      return colors.G400;
    }
    return colors.N200;
  }};
  margin-top: ${math.multiply(gridSize, 0.5)}px;
  display: flex;
  justify-content: baseline;
`;

const IconWrapper = styled.span`
  display: flex;
`;

type Props = {
  children: Node,
};

export const HelperMessage = ({ children }: Props) => (
  <Message>{children}</Message>
);

export const ErrorMessage = ({ children }: Props) => (
  <Message error>
    <IconWrapper>
      <ErrorIcon size="small" role="presentation" />
    </IconWrapper>
    {children}
  </Message>
);

export const ValidMessage = ({ children }: Props) => (
  <Message valid>
    <IconWrapper>
      <SuccessIcon size="small" role="presentation" />
    </IconWrapper>
    {children}
  </Message>
);
