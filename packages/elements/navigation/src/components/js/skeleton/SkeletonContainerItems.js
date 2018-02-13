// @flow
import React, { Component } from 'react';

import SkeletonContainerItem from './SkeletonContainerItem';

import SkeletonNavigationItems from '../../styled/skeleton/SkeletonNavigationItems';

export type Props = {
  isCollapsed: boolean,
};

export default class SkeletonContainerItems extends Component<Props> {
  static defaultProps = {
    isCollapsed: false,
  };

  render() {
    const { isCollapsed } = this.props;
    return (
      <SkeletonNavigationItems>
        <SkeletonContainerItem isCollapsed={isCollapsed} />
        <SkeletonContainerItem isCollapsed={isCollapsed} />
        <SkeletonContainerItem isCollapsed={isCollapsed} />
        <SkeletonContainerItem isCollapsed={isCollapsed} />
        <SkeletonContainerItem isCollapsed={isCollapsed} />
      </SkeletonNavigationItems>
    );
  }
}
