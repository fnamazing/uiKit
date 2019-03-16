// @flow
import { gridSize } from '@findable/theme';
import WarningIcon from '@findable/icon/glyph/warning';
import CheckCircleIcon from '@findable/icon/glyph/check-circle';
import InfoIcon from '@findable/icon/glyph/info';
import ErrorIcon from '@findable/icon/glyph/error';
import type { IconTypeMap } from './types';

export const itemSpacing: number = gridSize() / 2;

export const typesMapping: IconTypeMap = {
  connectivity: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
  confirmation: {
    icon: CheckCircleIcon,
    iconSize: 'medium',
  },
  info: {
    icon: InfoIcon,
    iconSize: 'medium',
  },
  warning: {
    icon: WarningIcon,
    iconSize: 'medium',
  },
  error: {
    icon: ErrorIcon,
    iconSize: 'medium',
  },
};
