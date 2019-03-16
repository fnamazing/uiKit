import * as React from 'react';
import { md, Example, code } from '@findable/docs';

export default md`
This transformer allows encoding ProseMirror Node in CXHTML or converting Confluence HTML to ProseMirror Node.

## Usage

  Use the encoder with editor-confluence-transformer as follows:

  ${code`import { ConfluenceTransformer } from '@findable/editor-confluence-transformer';
  import { confluenceSchema as schema } from '@findable/adf-schema';

  const serializer = new ConfluenceTransformer(schema);
  // To encode editor content as markdown
  serializer.encode(editorContent);
  // To convert HTML to editor content
  serializer.parse(html);`}

  ${(
    <Example
      packageName="@findable/editor-confluence-transformer"
      Component={require('../examples/0-cxhtml-transformer').default}
      title="Cxhtml Transformer"
      source={require('!!raw-loader!../examples/0-cxhtml-transformer')}
    />
  )}
`;
