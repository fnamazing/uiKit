// @flow
import React from 'react';
import { BreadcrumbsStateless, BreadcrumbsItem } from '@findable/breadcrumbs';
import Button, { ButtonGroup } from '@findable/button';
import TextField from '@findable/textfield';
import Select from '@findable/select';

import PageHeader from '../src';

const breadcrumbs = (
  <BreadcrumbsStateless onExpand={() => {}}>
    <BreadcrumbsItem text="Some project" key="Some project" />
    <BreadcrumbsItem text="Parent page" key="Parent page" />
  </BreadcrumbsStateless>
);
const actionsContent = (
  <ButtonGroup>
    <Button appearance="primary">Primary Action</Button>
    <Button>Default</Button>
    <Button>...</Button>
  </ButtonGroup>
);
const barContent = (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: '0 0 200px' }}>
      <TextField isCompact placeholder="Filter" aria-label="Filter" />
    </div>
    <div style={{ flex: '0 0 200px', marginLeft: 8 }}>
      <Select
        spacing="compact"
        placeholder="Choose an option"
        aria-label="Choose an option"
      />
    </div>
  </div>
);

export default () => (
  <PageHeader
    breadcrumbs={breadcrumbs}
    actions={actionsContent}
    bottomBar={barContent}
    truncateTitle
  >
    Title describing what the content should be, along with the context for
    which it applies — maybe also with some catchy words to draw attention
  </PageHeader>
);
