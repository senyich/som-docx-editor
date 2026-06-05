import { Document } from './types/document.js';
import { t as SdtType, u as SdtProperties, v as SdtDataBinding, D as DocumentBody, w as BlockSdt, B as BlockContent } from './content-C8fc_tL6.js';

/**
 * Content-control (SDT) addressing for the document model.
 *
 * Block-level content controls (`w:sdt`) are the natural anchor for template
 * logic and agent edits: they survive the round trip (see the parser +
 * serializer) and carry a stable `tag`/`alias`/`id`. This module is the
 * read side of that contract — discover controls and read their content
 * without a DOM or an editor instance, so server-side pipelines and AI
 * agents can find an anchor by tag and act on it.
 *
 * Walks the body recursively, descending into nested controls so a control
 * inside another control is still found. (The model places block content
 * controls at body level or nested in other controls, not inside table
 * cells.) The returned `path` (block indices from the body root) addresses
 * the control unambiguously for a follow-up edit.
 */

/** Filter for {@link findContentControls}. All provided fields must match (AND). */
interface ContentControlFilter {
    /** Developer identifier (`w:tag`), exact match. */
    tag?: string;
    /** Friendly name (`w:alias`), exact match. */
    alias?: string;
    /** Numeric id (`w:id`), exact match. */
    id?: number;
    /** Control type projection (`richText`, `dropDownList`, …). */
    type?: SdtType;
}
/** A discovered content control plus enough context to address and edit it. */
interface ContentControlInfo {
    /** Developer identifier (`w:tag`). */
    tag?: string;
    /** Friendly name (`w:alias`). */
    alias?: string;
    /** Numeric id (`w:id`). */
    id?: number;
    /** Control type projection. */
    sdtType: SdtType;
    /** Lock setting, if any. A locked control should refuse content edits. */
    lock?: SdtProperties['lock'];
    /** Dropdown/combobox list items, if modeled. */
    listItems?: {
        displayText: string;
        value: string;
    }[];
    /** Placeholder docPart reference, if any. */
    placeholder?: string;
    /** Whether the control is currently showing placeholder text (`w:showingPlcHdr`). */
    showingPlaceholder?: boolean;
    /** Checkbox state, for checkbox controls. */
    checked?: boolean;
    /** Date format string, for date controls. */
    dateFormat?: string;
    /** XML data binding (`w:dataBinding`), if the control is bound. */
    dataBinding?: SdtDataBinding;
    /** Plain text of the control's content (paragraphs/tables/nested controls flattened). */
    text: string;
    /**
     * Block-index path from the document body to this control. Top-level
     * controls are `[i]`; a control nested inside the i-th body block's content
     * is `[i, j]`, and so on. Stable address for a follow-up edit.
     */
    path: number[];
    /** Nesting depth (0 = direct child of the body). */
    depth: number;
}
/** Plain text of a control's content, descending into tables and nested SDTs. */
declare function getContentControlText(control: BlockSdt): string;
/**
 * Find every block-level content control in the document, optionally filtered
 * by tag/alias/id/type. Results are in document order; nested controls follow
 * their parent. Searches the body and controls nested inside controls. Table
 * cells are not searched (the current model/parser does not surface cell-level
 * controls), and headers/footers live in a separate content tree.
 */
declare function findContentControls(input: Document | DocumentBody, filter?: ContentControlFilter): ContentControlInfo[];
/** Convenience: the first control matching `filter`, or `undefined`. */
declare function findContentControl(input: Document | DocumentBody, filter: ContentControlFilter): ContentControlInfo | undefined;
/** No control matched the filter. */
declare class ContentControlNotFoundError extends Error {
    constructor(filter: ContentControlFilter);
}
/** The matched control's lock forbids the attempted edit (pass `force` to override). */
declare class ContentControlLockedError extends Error {
    constructor(lock: SdtProperties['lock'], op: 'edit' | 'remove');
}
/**
 * The control's type doesn't support free text/block replacement (e.g. a
 * dropdown, date, checkbox, or picture control), so writing arbitrary content
 * would desync the type marker from its value. Use a type-specific setter, or
 * pass `{ force: true }` to override.
 */
declare class ContentControlTypeError extends Error {
    constructor(sdtType: SdtType);
}
/**
 * The control is bound to a Custom XML data store (`w:dataBinding`). Writing its
 * content won't stick — Word re-renders the control from the bound XML node — so
 * the write is refused. Update the data store instead, or pass `{ force: true }`.
 */
declare class ContentControlBoundError extends Error {
    constructor();
}
/**
 * Replace the content of the first control matching `filter`. `replacement`
 * may be a string (split into paragraphs on newlines) or block content. The
 * control's properties, tag/alias, and lossless raw `w:sdtPr` are preserved —
 * only the contained blocks change, so the result still round-trips.
 *
 * When the control was showing its placeholder (`w:showingPlcHdr`), that flag
 * is cleared so Word doesn't render the new content as placeholder text.
 *
 * Throws {@link ContentControlNotFoundError} if nothing matches,
 * {@link ContentControlLockedError} if the control's lock forbids editing, and
 * {@link ContentControlTypeError} if the control is a typed (dropdown/date/…)
 * control whose value shouldn't be set as free text. Pass `{ force: true }` to
 * override the lock/type guards.
 */
declare function setContentControlContent(doc: Document, filter: ContentControlFilter, replacement: string | BlockContent[], options?: {
    force?: boolean;
}): Document;
/**
 * Remove the first control matching `filter` from the document. With
 * `keepContent: true` the control's blocks are unwrapped in place (the box
 * goes away, the content stays) — useful for "resolve this conditional
 * section into plain content". Otherwise the whole region is deleted.
 *
 * Unwrapping a repeating-section (item) is refused unless `force`, since
 * lifting its blocks out would orphan the (w15) repeating structure.
 *
 * Throws {@link ContentControlNotFoundError} / {@link ContentControlLockedError}
 * as {@link setContentControlContent} does.
 */
declare function removeContentControl(doc: Document, filter: ContentControlFilter, options?: {
    force?: boolean;
    keepContent?: boolean;
}): Document;

/**
 * Typed value setters for block-level content controls — set a dropdown
 * selection, toggle a checkbox, or set a date. These produce both the visible
 * content (the run text Word shows) and the structured state inside the
 * captured raw `w:sdtPr` (dropdown `w:lastValue`, `w14:checked`, `w:date`'s
 * `w:fullDate`), patched in place so the rest of the control round-trips
 * verbatim. Use these instead of {@link setContentControlContent} for typed
 * controls, which that function refuses by design.
 *
 * Raw `w:sdtPr` is patched with targeted string edits (not a full re-serialize)
 * to preserve the `CT_SdtPr` element order and any unmodeled properties — the
 * same capture-and-replay contract used everywhere else for SDTs.
 */

/** A typed value to apply to a content control. */
type ContentControlValue = {
    kind: 'dropdown';
    value: string;
} | {
    kind: 'checkbox';
    checked: boolean;
} | {
    kind: 'date';
    date: string;
};
/** The control doesn't support the requested value kind, or the value is invalid. */
declare class ContentControlValueError extends Error {
    constructor(message: string);
}
/** Format an ISO date (yyyy-mm-dd) with a subset of OOXML date tokens. */
declare function formatSdtDate(iso: string, pattern?: string): string;
/**
 * Set a typed value (dropdown selection / checkbox / date) on the first control
 * matching `filter`, returning a new {@link Document}. Updates both the visible
 * content and the structured raw state, so the result round-trips and Word
 * shows the new value. Throws {@link ContentControlNotFoundError} if nothing
 * matches, {@link ContentControlLockedError} if content-locked,
 * {@link ContentControlBoundError} if data-bound (the store would override the
 * write), and {@link ContentControlValueError} if the value doesn't fit the
 * control type. The lock/bound guards are overridable with `{ force: true }`.
 */
declare function setContentControlValue(doc: Document, filter: ContentControlFilter, value: ContentControlValue, options?: {
    force?: boolean;
}): Document;

export { ContentControlBoundError as C, type ContentControlFilter as a, type ContentControlInfo as b, ContentControlLockedError as c, ContentControlNotFoundError as d, ContentControlTypeError as e, type ContentControlValue as f, ContentControlValueError as g, findContentControl as h, findContentControls as i, formatSdtDate as j, getContentControlText as k, setContentControlValue as l, removeContentControl as r, setContentControlContent as s };
