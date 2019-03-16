// @flow

import React, { Component } from 'react';
import GlobalNavigation from '@findable/global-navigation';
import DashboardIcon from '@findable/icon/glyph/dashboard';
import FolderIcon from '@findable/icon/glyph/folder';
import IssueIcon from '@findable/icon/glyph/issue';
import PortfolioIcon from '@findable/icon/glyph/portfolio';
import { JiraIcon, JiraWordmark } from '@findable/logo';
import {
  LayoutManagerWithViewController,
  NavigationProvider,
  ViewController,
  withNavigationViewController,
} from '../../../src';

const MyGlobalNavigation = () => (
  <GlobalNavigation
    productIcon={() => <JiraIcon size="medium" />}
    onProductClick={() => {}}
  />
);

const productHomeView = {
  id: 'product/home',
  type: 'product',
  getItems: () => [
    {
      type: 'HeaderSection',
      id: 'product/home:header',
      items: [
        {
          type: 'Wordmark',
          wordmark: JiraWordmark,
          id: 'jira-wordmark',
        },
      ],
    },
    {
      type: 'MenuSection',
      id: 'product/home:menu',
      items: [
        {
          type: 'Item',
          id: 'dashboards',
          before: DashboardIcon,
          text: 'Dashboards',
        },
        { type: 'Item', id: 'projects', before: FolderIcon, text: 'Projects' },
        {
          type: 'Item',
          id: 'issues-and-filters',
          before: IssueIcon,
          text: 'Issues and filters',
        },
        {
          type: 'Item',
          id: 'portfolio',
          before: PortfolioIcon,
          text: 'Portfolio',
        },
      ],
    },
  ],
};

class App extends Component<{
  navigationViewController: ViewController,
}> {
  componentDidMount() {
    const { navigationViewController } = this.props;
    navigationViewController.addView(productHomeView);
    navigationViewController.setView(productHomeView.id);
  }

  render() {
    return (
      <LayoutManagerWithViewController globalNavigation={MyGlobalNavigation}>
        <div css={{ padding: 30 }}>Page content goes here.</div>
      </LayoutManagerWithViewController>
    );
  }
}
const AppWithNavigationViewController = withNavigationViewController(App);

export default () => (
  <NavigationProvider>
    <AppWithNavigationViewController />
  </NavigationProvider>
);
