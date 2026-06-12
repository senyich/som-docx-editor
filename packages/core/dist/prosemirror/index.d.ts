export { schema } from './schema/index.js';
export { ToProseDocOptions, createEmptyDoc, footnoteToProseDoc, headerFooterToProseDoc, toProseDoc } from './conversion/index.js';
export { fromProseDoc, updateDocumentContent } from './conversion/fromProseDoc.js';
export { ResolvedParagraphStyle, StyleResolver, createStyleResolver } from './styles/index.js';
import { EditorState, Transaction } from 'prosemirror-state';
export { TextSelection } from 'prosemirror-state';
import { T as TextFormatting, P as ParagraphFormatting } from '../formatting-_OXU8gLB.js';
export { SelectionChangeCallback, SelectionContext, createSelectionTrackerPlugin, extractSelectionContext, getSelectionContext, selectionTrackerKey } from './plugins/selectionTracker.js';
export { c as createDocumentStylesPlugin, d as documentStylesKey, g as getDocumentStyleResolver } from '../documentStyles-C7k_8Sye.js';
export { clearFontFamily, clearFontSize, clearFormatting, clearHighlight, clearTextColor, findHyperlinkRangeAt, getHyperlinkAttrs, getMarkAttr, getSelectedText, insertHyperlink, isHyperlinkActive, isMarkActive, removeHyperlink, setFontFamily, setFontSize, setHighlight, setHyperlink, setTextColor, toggleBold, toggleItalic, toggleStrike, toggleSubscript, toggleSuperscript, toggleUnderline } from './commands/formatting.js';
export { addTabStop, alignCenter, alignJustify, alignLeft, alignRight, applyStyle, clearStyle, decreaseIndent, decreaseListLevel, generateTOC, getListInfo, getParagraphAlignment, getParagraphBidi, getStyleId, increaseIndent, increaseListLevel, isInList, removeList, removeTabStop, setAlignment, setIndentFirstLine, setIndentLeft, setIndentRight, setLineSpacing, setLtr, setRtl, toggleBulletList, toggleNumberedList } from './commands/paragraph.js';
export { a as addColumnLeft, b as addColumnRight, c as addRowAbove, d as addRowBelow, e as applyTableStyle, f as autoFitContents, g as deleteColumn, h as deleteRow, i as deleteTable, j as distributeColumns, k as insertTable, m as mergeCells, r as removeTableBorders, s as selectColumn, l as selectRow, n as selectTable, o as setAllTableBorders, p as setCellBorder, q as setCellFillColor, t as setCellMargins, u as setCellTextDirection, v as setCellVerticalAlign, w as setInsideTableBorders, x as setOutsideTableBorders, y as setRowHeight, z as setTableBorderColor, A as setTableBorderWidth, B as setTableBorders, C as setTableProperties, D as splitCell, E as toggleHeaderRow, F as toggleNoWrap } from '../table-P8esKWAc.js';
export { insertPageBreak } from './commands/pageBreak.js';
export { I as ImageAttrs, P as ParagraphAttrs } from '../nodes-cZAxqmMz.js';
import { Node } from 'prosemirror-model';
import { a as ContentControlFilter, f as ContentControlValue } from '../contentControlValues-uo4coACN.js';
import { u as SdtType, v as SdtProperties, w as SdtDataBinding } from '../content-E-cahBKn.js';
export { f as findParagraphByParaId, a as findStartPosForParaId } from '../findParagraphByParaId-Maw_8M5D.js';
export { LayoutSelectionGate } from './utils/LayoutSelectionGate.js';
export { B as BorderPreset, T as TableContextInfo, g as getTableContext, i as isInTable } from '../borders-Z9hPno2u.js';
export { F as FontFamilyAttrs, a as FontSizeAttrs, H as HyperlinkAttrs, T as TextColorAttrs, U as UnderlineAttrs } from '../marks-CjC9tF5k.js';
import '../types-RchZmPFN.js';
import '../colors-C3vA7HUU.js';
import '../docx/wrapTypes.js';
import '../watermark-DAcnAs_J.js';
import '../types/document.js';
import '../styles-BWqX2AS-.js';

/**
 * Selection State Utilities
 *
 * Extracts selection state from ProseMirror for toolbar integration.
 */

/**
 * Selection state for toolbar integration
 */
interface SelectionState {
    /** Whether there's an active selection (not just cursor) */
    hasSelection: boolean;
    /** Whether selection spans multiple paragraphs */
    isMultiParagraph: boolean;
    /** Current text formatting at selection/cursor */
    textFormatting: TextFormatting;
    /** Current paragraph formatting */
    paragraphFormatting: ParagraphFormatting;
    /** Current paragraph style ID (e.g., 'Heading1', 'Normal') */
    styleId: string | null;
    /** Start paragraph index */
    startParagraphIndex: number;
    /** End paragraph index */
    endParagraphIndex: number;
}
/**
 * Extract selection state from editor state.
 * Used by PagedEditor integration in DocxEditor for toolbar state.
 */
declare function extractSelectionState(state: EditorState): SelectionState | null;

/**
 * ProseMirror-level content-control (SDT) addressing for the live editor.
 *
 * The headless equivalents in `agent/contentControls` operate on the parsed
 * Document model; these operate on the editor's PM state so the editor adapters
 * (React/Vue) can discover and edit a control by tag without a full reload and
 * with normal undo. Shared by both adapters to keep them in lockstep.
 */

/** A control discovered in the PM doc, with its PM position for scroll/edit. */
interface PMContentControl {
    tag?: string;
    alias?: string;
    id?: number;
    sdtType: SdtType;
    lock?: SdtProperties['lock'];
    /** Whether the control is currently showing placeholder text. */
    showingPlaceholder?: boolean;
    /** Checkbox state, for checkbox controls. */
    checked?: boolean;
    /** Date format, for date controls. */
    dateFormat?: string;
    /** Dropdown/combobox list items, if modeled. */
    listItems?: {
        displayText: string;
        value: string;
    }[];
    /** XML data binding (`w:dataBinding`), if the control is bound. */
    dataBinding?: SdtDataBinding;
    /** Current date value (ISO `yyyy-mm-dd`) for a date control, from `w:fullDate`. */
    dateValue?: string;
    /** Plain text of the control's content. */
    text: string;
    /** PM position of the `blockSdt` node (its `before` position). */
    pos: number;
    /** Nesting depth among content controls (0 = not inside another control). */
    depth: number;
}
/** All block content controls in the PM doc (document order), optionally filtered. */
declare function findContentControlsInPM(doc: Node, filter?: ContentControlFilter): PMContentControl[];
/** PM position of the first control matching `filter`, or `null`. */
declare function findContentControlPos(doc: Node, filter: ContentControlFilter): number | null;
/**
 * Build a transaction that replaces the first matching control's content with
 * `text` (newlines become paragraphs; a `plainText` control stays one
 * paragraph). Throws if nothing matches, the control is content-locked, a typed
 * (dropdown/date/…) control, or data-bound (unless `force`). The control's
 * identity/raw props are kept; a `w:showingPlcHdr` placeholder flag is cleared
 * so the new content isn't rendered as placeholder.
 */
declare function setContentControlContentTr(state: EditorState, filter: ContentControlFilter, text: string, options?: {
    force?: boolean;
}): Transaction;
/**
 * Build a transaction that removes the first matching control. With
 * `keepContent` the inner blocks are unwrapped in place; otherwise the whole
 * region is deleted. Throws if nothing matches or the control is
 * deletion-locked (unless `force`).
 */
declare function removeContentControlTr(state: EditorState, filter: ContentControlFilter, options?: {
    force?: boolean;
    keepContent?: boolean;
}): Transaction;
/**
 * Build a transaction that applies a typed value (dropdown selection, checkbox
 * toggle, or date) to the first control matching `filter`, updating both the
 * visible content and the control's structured attrs (checked / raw w:sdtPr).
 * Reuses the headless value-applier so the live editor and headless paths agree.
 * Throws as the headless {@link setContentControlValue} does.
 */
declare function setContentControlValueTr(state: EditorState, filter: ContentControlFilter, value: ContentControlValue, options?: {
    force?: boolean;
}): Transaction;
/**
 * Build a transaction that adds a repeating-section item by cloning the item at
 * `itemPos` (its blockSdt `before` position) and inserting the copy after it.
 * Throws {@link RepeatingSectionError} if `itemPos` isn't a repeating item.
 */
declare function addRepeatingSectionItemTr(state: EditorState, itemPos: number): Transaction;
/**
 * Build a transaction that removes the repeating-section item at `itemPos`.
 * Throws {@link RepeatingSectionError} if it isn't an item or is the only one in
 * its section.
 */
declare function removeRepeatingSectionItemTr(state: EditorState, itemPos: number): Transaction;

export { type PMContentControl, type SelectionState, addRepeatingSectionItemTr, extractSelectionState, findContentControlPos, findContentControlsInPM, removeContentControlTr, removeRepeatingSectionItemTr, setContentControlContentTr, setContentControlValueTr };
