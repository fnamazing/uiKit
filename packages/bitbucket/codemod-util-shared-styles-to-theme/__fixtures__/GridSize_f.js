// @flow
import { akGridSize, akGridSizeUnitless } from "@findable/util-shared-styles";
import { colors } from "@findable/theme";
import styled, { css } from "styled-components";
const ComponentA = styled.div`
  padding: ${akGridSize};
  background: ${colors.N100};
  color: ${colors.P500};
`;
const ComponentB = styled.div`
  background: ${colors.N100};
  color: ${colors.P500};
  ${css`
    background: ${colors.N100};
    padding: ${akGridSizeUnitless}px;
    ${css`
      margin: ${akGridSize};
    `};
  `};
`;
//////
// @flow
import { colors, gridSize } from "@findable/theme";
import styled, { css } from "styled-components";
const ComponentA = styled.div`
  padding: ${gridSize()}px;
  background: ${colors.N100};
  color: ${colors.P500};
`;
const ComponentB = styled.div`
  background: ${colors.N100};
  color: ${colors.P500};
  ${css`
    background: ${colors.N100};
    padding: ${gridSize()}px;
    ${css`
      margin: ${gridSize()}px;
    `};
  `};
`;
