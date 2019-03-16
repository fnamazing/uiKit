import { defaultSchema } from '@findable/adf-schema';
import WikiMarkupTransformer from '../../../index';

import { doc, hr, p } from '@findable/editor-test-helpers';

describe('ADF => WikiMarkup - Panel', () => {
  const transformer = new WikiMarkupTransformer();

  test('should convert rule node', () => {
    const node = doc(
      p('This is a ruler'),
      hr(),
      p('I am in between a ruler'),
      hr(),
      p('I am under a ruler'),
    )(defaultSchema);
    expect(transformer.encode(node)).toMatchSnapshot();
  });
});
