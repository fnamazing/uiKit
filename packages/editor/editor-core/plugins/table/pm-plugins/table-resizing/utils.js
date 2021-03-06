import { cellAround, TableMap } from 'prosemirror-tables';
import { calcTableWidth, akEditorWideLayoutWidth, akEditorDefaultLayoutWidth, akEditorFullWidthLayoutWidth, getBreakpoint, mapBreakpointToLayoutMaxWidth, } from '@findable/editor-common';
export var tableLayoutToSize = {
    default: akEditorDefaultLayoutWidth,
    wide: akEditorWideLayoutWidth,
    'full-width': akEditorFullWidthLayoutWidth,
};
/**
 * Translates named layouts in number values.
 * @param tableLayout
 * @param containerWidth
 */
export function getLayoutSize(tableLayout, containerWidth, dynamicTextSizing) {
    if (containerWidth === void 0) { containerWidth = 0; }
    var calculatedTableWidth = calcTableWidth(tableLayout, containerWidth);
    if (calculatedTableWidth.endsWith('px')) {
        return parseInt(calculatedTableWidth, 10);
    }
    if (dynamicTextSizing && tableLayout === 'default') {
        return getDefaultLayoutMaxWidth(containerWidth);
    }
    return tableLayoutToSize[tableLayout] || containerWidth;
}
export function getDefaultLayoutMaxWidth(containerWidth) {
    return mapBreakpointToLayoutMaxWidth(getBreakpoint(containerWidth));
}
/**
 * Does the current position point at a cell.
 * @param $pos
 */
export function pointsAtCell($pos) {
    return ($pos.parent.type.spec.tableRole ===
        'row' && $pos.nodeAfter);
}
/**
 * Returns the pos of the cell on the side requested.
 * @param view
 * @param event
 * @param side
 */
export function edgeCell(view, event, side, handleWidth) {
    var buffer = side === 'right' ? -handleWidth : handleWidth; // Fixes finicky bug where posAtCoords could return wrong pos.
    var posResult = view.posAtCoords({
        left: event.clientX + buffer,
        top: event.clientY,
    });
    if (!posResult || !posResult.pos) {
        return -1;
    }
    var $cell = cellAround(view.state.doc.resolve(posResult.pos));
    if (!$cell) {
        return -1;
    }
    if (side === 'right') {
        return $cell.pos;
    }
    var map = TableMap.get($cell.node(-1));
    var start = $cell.start(-1);
    var index = map.map.indexOf($cell.pos - start);
    return index % map.width === 0 ? -1 : start + map.map[index - 1];
}
/**
 * Get the current col width, handles colspan.
 * @param view
 * @param cellPos
 * @param param2
 */
export function currentColWidth(view, cellPos, _a) {
    var colspan = _a.colspan, colwidth = _a.colwidth;
    var width = colwidth && colwidth[colwidth.length - 1];
    if (width) {
        return width;
    }
    // Not fixed, read current width from DOM
    var domWidth = view.domAtPos(cellPos + 1).node.offsetWidth;
    var parts = colspan || 0;
    if (colwidth) {
        for (var i = 0; i < (colspan || 0); i++) {
            if (colwidth[i]) {
                domWidth -= colwidth[i];
                parts--;
            }
        }
    }
    return domWidth / parts;
}
/**
 * Attempts to find a parent TD/TH depending on target element.
 * @param target
 */
export function domCellAround(target) {
    while (target && target.nodeName !== 'TD' && target.nodeName !== 'TH') {
        target = target.classList.contains('ProseMirror')
            ? null
            : target.parentNode;
    }
    return target;
}
//# sourceMappingURL=utils.js.map