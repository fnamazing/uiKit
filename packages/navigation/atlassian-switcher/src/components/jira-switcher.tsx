import * as React from 'react';
import Switcher from './switcher';
import { CustomLinksProvider } from '../providers/jira-data-providers';
import CommonDataProvider from '../providers/common-data-provider';
import { getSuggestedProductLink } from '../utils/links';

interface JiraSwitcherProps {
  cloudId: string;
  triggerXFlow: (productKey: string, sourceComponent: string) => void;
}

export default (props: JiraSwitcherProps) => (
  <CustomLinksProvider>
    {customLinks => (
      <CommonDataProvider cloudId={props.cloudId}>
        {({ licenseInformation, ...dataProps }) => (
          <Switcher
            {...props}
            {...dataProps}
            licenseInformation={licenseInformation}
            suggestedProductLink={getSuggestedProductLink(
              licenseInformation.data,
            )}
            customLinks={customLinks}
          />
        )}
      </CommonDataProvider>
    )}
  </CustomLinksProvider>
);
