import { name } from '../../../package.json';
import { Node } from 'prosemirror-model';
import {
  doc,
  p,
  hr,
  decisionList,
  decisionItem,
  defaultSchema as schema,
} from '@atlaskit/editor-test-helpers';
import {
  isEmpty,
  isEmptyParagraph,
  isEmptyDocument,
  preprocessDoc,
} from '../../../src/editor/utils/document';
// import schema from '../../../src/test-helper/schema';

describe(name, () => {
  describe('Utils -> Document', () => {
    describe('#isEmptyParagraph', () => {
      it('should return true if paragraph is empty', () => {
        expect(isEmptyParagraph(p('')(schema))).toBe(true);
      });

      it('should return false if paragraph is not empty', () => {
        expect(isEmptyParagraph(p('some text')(schema))).toBe(false);
      });
    });

    describe('#isEmpty', () => {
      it('should return true if node is empty', () => {
        expect(isEmpty(p('')(schema))).toBe(true);
      });

      it('should return true if the only child of a node is an empty paragraph', () => {
        expect(isEmpty(doc(p(''))(schema))).toBe(true);
      });

      it('should return true if node only contains empty block nodes', () => {
        expect(isEmpty(doc(p(''), p(''), p(''))(schema))).toBe(true);
      });

      it('should return false if the only child of a node is not an empty paragraph', () => {
        expect(isEmpty(doc(p('some text'))(schema))).toBe(false);
      });

      it('should return false if node contains non-empty block nodes', () => {
        expect(isEmpty(doc(p(''), p('some text'), p(''))(schema))).toBe(false);
      });
    });

    describe('isEmptyDocument', () => {
      it('should return true if node looks like an empty document', () => {
        const node = doc(p(''))(schema);
        expect(isEmptyDocument(node)).toBe(true);
      });

      it('should return false if node has text content', () => {
        const node = doc(p('hello world'))(schema);
        expect(isEmptyDocument(node)).toBe(false);
      });

      it('should return false if node has multiple empty children', () => {
        const node = doc(p(''), p(''))(schema);
        expect(isEmptyDocument(node)).toBe(false);
      });

      it('should return false if node has block content', () => {
        const node = doc(decisionList({})(decisionItem({})()))(schema);
        expect(isEmptyDocument(node)).toBe(false);
      });

      it('should return false if node has hr', () => {
        expect(isEmpty(doc(p(), hr())(schema))).toBe(false);
      });
    });

    describe('preprocessDoc', () => {
      it('should return true if node is empty', () => {
        const editorContent = doc(
          p('some text'),
          decisionList({})(decisionItem({})()),
        )(schema);
        const processedContent = preprocessDoc(schema, editorContent);
        expect(processedContent).not.toBe(undefined);
        expect((processedContent as Node)!.content!.childCount).toEqual(1);
        expect(
          (processedContent as Node)!.content!.firstChild!.type.name,
        ).toEqual('paragraph');
      });

      it('should return new document', () => {
        const editorContent = doc(
          p('some text'),
          decisionList({})(decisionItem({})()),
        )(schema);
        const processedContent = preprocessDoc(schema, editorContent);
        expect(processedContent).not.toEqual(editorContent);
      });
    });
  });
});
