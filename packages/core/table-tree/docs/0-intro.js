// @flow
import React from 'react';
import { code, md, Example, Props } from '@findable/docs';

export default md`
The component displays a table of expandable, nested rows that form a tree-like hierarchy.
Child rows can be loaded asynchronously, on expansion.

## Usage

${code`import TableTree from '@findable/table-tree';`}

Import the default exported Component and provide the data in \`items\` prop.

${(
  <Example
    packageName="@findable/table-tree"
    Component={require('../examples/single-component').default}
    source={require('!!raw-loader!../examples/single-component')}
    title="With Static Data"
    language="jsx"
  />
)}

### Expected data structure for \`items\` props

${code`
[
  {
    id: //Item 1 id,
    content: {

    },
    hasChildren:
    children: [
      // Item 1 children
      {
        // Child 1
      }
    ]
  },
  {
    // Item 2
  }
]
`}

  ## Usage

  ${code`import TableTree, {
  Headers,
  Header,
  Cell,
  Rows,
  Row,
  TableTreeDataHelper,
} from '@findable/table-tree';`}

${(
  <Props
    heading="TableTree Props"
    props={require('!!extract-react-types-loader!../src/components/TableTree')}
  />
)}
`;
