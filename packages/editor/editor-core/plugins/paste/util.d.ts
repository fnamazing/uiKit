import { Slice, Mark, NodeType, Schema } from 'prosemirror-model';
export declare function isPastedFromWord(html?: string): boolean;
export declare function isPastedFromExcel(html?: string): boolean;
export declare function isPastedFromDropboxPaper(html?: string): boolean;
export declare function isPastedFromGoogleDocs(html?: string): boolean;
export declare function isPastedFromGoogleSpreadSheets(html?: string): boolean;
export declare function isPastedFromPages(html?: string): boolean;
export declare function isPastedFromFabricEditor(html?: string): boolean;
export declare const isSingleLine: (text: string) => boolean;
export declare function getPasteSource(event: ClipboardEvent): string;
export declare function isCode(str: string): boolean;
export declare function escapeLinks(text: string): string;
export declare function hasOnlyNodesOfType(...nodeTypes: NodeType[]): (slice: Slice) => boolean;
export declare function applyTextMarksToSlice(schema: Schema, marks?: Mark<any>[]): (slice: Slice) => Slice;