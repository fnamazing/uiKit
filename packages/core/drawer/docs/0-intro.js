// @flow
import React from 'react';
import { md, Example, Props } from '@atlaskit/docs';

export default md`
  This package exports \`Drawer\` and \`DrawerBase\` components.

  You can wrap \`Drawer\` around any other React component to display the given
  \`children\` when the user hovers over the wrapped component.

  ${(
    <Example
      Component={require('../examples/00-basic-drawer').default}
      source={require('!!raw-loader!../examples/00-basic-drawer')}
      title="Basic Usage"
    />
  )}

  Above is a basic example of how to define width.

  ${(
    <Example
      Component={require('../examples/05-drawer-widths').default}
      source={require('!!raw-loader!../examples/05-drawer-widths')}
      title="Drawer Width"
      componentProps={{ test: true }}
    />
  )}

  Drawers have three standard sizes available; \`full\`, \`narrow\`, and \`wide\`. You can use drawers with sibling elements with 'z-index' elements without any issue.

  ${(
    <Example
      Component={require('../examples/11-sibling-element-with-z-index').default}
      source={require('!!raw-loader!../examples/11-sibling-element-with-z-index')}
      title="Sibling element with z-index"
    />
  )}

  You can control if the content will be remounted on close passing the \`shouldUnmountOnExit\` prop. So that you can retain the drawer content and use it next time the component is displayed.


  Default value: \`false\`


  ${(
    <Example
      Component={
        require('../examples/15-retain-drawer-contents-on-close').default
      }
      source={require('!!raw-loader!../examples/15-retain-drawer-contents-on-close')}
      title="Retain content when drawer is closed"
    />
  )}

  The component is listening to be closed if the component is opened and the user clicks on 'ESC' keyboard button.

  ${(
    <Props
      props={require('!!extract-react-types-loader!../src/components/index')}
    />
  )}
`;
