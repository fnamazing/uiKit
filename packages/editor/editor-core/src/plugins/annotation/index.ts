import { EditorPlugin } from '../../types';
import { annotation } from '@findable/adf-schema';

// tslint:disable-next-line:variable-name
const annotationPlugin: EditorPlugin = {
  marks() {
    return [
      {
        name: 'annotation',
        mark: annotation,
      },
    ];
  },
};

export default annotationPlugin;
