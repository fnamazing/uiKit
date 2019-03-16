import { Command } from '../types';
export declare const toggleBold: Keymap;
export declare const toggleItalic: Keymap;
export declare const toggleUnderline: Keymap;
export declare const toggleStrikethrough: Keymap;
export declare const toggleCode: Keymap;
export declare const pastePlainText: Keymap;
export declare const clearFormatting: Keymap;
export declare const setNormalText: Keymap;
export declare const toggleHeading1: Keymap;
export declare const toggleHeading2: Keymap;
export declare const toggleHeading3: Keymap;
export declare const toggleHeading4: Keymap;
export declare const toggleHeading5: Keymap;
export declare const toggleOrderedList: Keymap;
export declare const toggleBulletList: Keymap;
export declare const toggleBlockQuote: Keymap;
export declare const insertNewLine: Keymap;
export declare const shiftBackspace: Keymap;
export declare const splitCodeBlock: Keymap;
export declare const splitListItem: Keymap;
export declare const insertRule: Keymap;
export declare const undo: Keymap;
export declare const moveUp: Keymap;
export declare const moveDown: Keymap;
export declare const moveLeft: Keymap;
export declare const moveRight: Keymap;
export declare const indentList: Keymap;
export declare const outdentList: Keymap;
export declare const redo: Keymap;
export declare const redoBarred: Keymap;
export declare const openHelp: Keymap;
export declare const addLink: Keymap;
export declare const submit: Keymap;
export declare const enter: Keymap;
export declare const tab: Keymap;
export declare const indent: Keymap;
export declare const outdent: Keymap;
export declare const backspace: Keymap;
export declare const deleteKey: Keymap;
export declare const space: Keymap;
export declare const escape: Keymap;
export declare const nextCell: Keymap;
export declare const previousCell: Keymap;
export declare const toggleTable: Keymap;
export declare const addRowBefore: Keymap;
export declare const addRowAfter: Keymap;
export declare const addColumnAfter: Keymap;
export declare const addColumnBefore: Keymap;
export declare const cut: Keymap;
export declare const copy: Keymap;
export declare const paste: Keymap;
export declare const altPaste: Keymap;
export declare function tooltip(keymap: Keymap | undefined, description?: string): string | undefined;
export declare function findKeymapByDescription(description: string): Keymap | undefined;
export declare function findShortcutByDescription(description: string): string | undefined;
export declare function findShortcutByKeymap(keymap: Keymap): string | undefined;
export interface Keymap {
    description: string;
    windows: string;
    mac: string;
    common?: string;
}
export declare function bindKeymapWithCommand(shortcut: string, cmd: Command, keymap: {
    [key: string]: Function;
}): void;
export declare function findKeyMapForBrowser(kayMap: Keymap): string | undefined;
export declare const LEFT = 37;
export declare const RIGHT = 39;
export declare const UP = 38;
export declare const DOWN = 40;