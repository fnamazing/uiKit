// @flow

import React from 'react';
import DashboardIcon from '@findable/icon/glyph/dashboard';
import FolderIcon from '@findable/icon/glyph/folder';
import IssuesIcon from '@findable/icon/glyph/issues';
import { JiraWordmark } from '@findable/logo';

import { HeaderSection, Item, Wordmark, MenuSection } from '../../../src';

const ProductNavigation = () => (
  <div data-webdriver-test-key="product-navigation">
    <HeaderSection>
      {({ className }) => (
        <div className={className}>
          <Wordmark wordmark={JiraWordmark} />
        </div>
      )}
    </HeaderSection>
    <MenuSection>
      {({ className }) => (
        <div className={className}>
          <Item
            before={DashboardIcon}
            text="Dashboards"
            testKey="product-item-dashboards"
          />
          <Item
            before={FolderIcon}
            text="Projects"
            testKey="product-item-projects"
          />
          <Item
            before={IssuesIcon}
            text="Issues"
            testKey="product-item-issues"
          />
        </div>
      )}
    </MenuSection>
  </div>
);

export default ProductNavigation;
