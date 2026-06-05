export { B as BorderSpec, C as ColorValue, S as ShadingProperties, T as ThemeColorSlot } from '../colors-C3vA7HUU.mjs';
export { C as CellMargins, g as ConditionalFormatStyle, E as EmphasisMark, F as FloatingTableProperties, L as LineSpacingRule, d as ParagraphAlignment, P as ParagraphFormatting, h as TabLeader, e as TabStop, i as TabStopAlignment, j as TableBorders, c as TableCellFormatting, a as TableFormatting, f as TableLook, k as TableMeasurement, b as TableRowFormatting, l as TableWidthType, m as TextEffect, T as TextFormatting, U as UnderlineStyle } from '../formatting-BH4hcZiq.mjs';
import { D as DocumentBody, k as NumberingDefinitions, F as Footnote, E as Endnote, y as HeaderFooter } from '../content-3xF4WDE8.mjs';
export { A as AbstractNumbering, B as BlockContent, w as BlockSdt, z as BookmarkEnd, G as BookmarkStart, x as BreakContent, J as Column, e as Comment, f as CommentRangeEnd, g as CommentRangeStart, K as ComplexField, h as Deletion, O as DrawingContent, Q as EndnotePosition, U as EndnoteProperties, V as Field, W as FieldCharContent, X as FieldType, Y as FooterReference, Z as FootnotePosition, _ as FootnoteProperties, $ as HeaderFooterType, a0 as HeaderReference, H as Hyperlink, I as Image, a1 as ImageCrop, a2 as ImagePadding, a3 as ImagePosition, a4 as ImageSize, a5 as ImageTransform, a6 as ImageWrap, a7 as InlineSdt, i as Insertion, a8 as InstrTextContent, a9 as LevelSuffix, aa as LineNumberRestart, L as ListLevel, ab as ListRendering, ac as MathEquation, M as MoveFrom, ad as MoveFromRangeEnd, ae as MoveFromRangeStart, j as MoveTo, af as MoveToRangeEnd, ag as MoveToRangeStart, ah as NoBreakHyphenContent, ai as NoteNumberRestart, aj as NoteRefMarkContent, ak as NoteReferenceContent, N as NumberFormat, al as NumberingInstance, am as PageOrientation, P as Paragraph, l as ParagraphContent, a as ParagraphPropertyChange, an as PropertyChangeInfo, m as Run, n as RunContent, ao as RunPropertyChange, v as SdtDataBinding, u as SdtProperties, t as SdtType, ap as Section, S as SectionProperties, aq as SectionStart, ar as SeparatorContent, as as Shape, at as ShapeContent, au as ShapeFill, av as ShapeOutline, aw as ShapeTextBody, ax as ShapeType, ay as SimpleField, az as SoftHyphenContent, aA as SymbolContent, aB as TabContent, T as Table, o as TableCell, c as TableCellPropertyChange, b as TablePropertyChange, p as TableRow, d as TableRowPropertyChange, aC as TableStructuralChangeInfo, aD as TextBox, q as TextContent, r as TrackedChangeInfo, s as TrackedRunChange, aE as VerticalAlign } from '../content-3xF4WDE8.mjs';
export { P as PictureWatermark, T as TextWatermark, W as Watermark, p as pictureWatermarkDisplayEmu } from '../watermark-DAcnAs_J.mjs';
import { S as StyleDefinitions, T as Theme, F as FontTable, b as RelationshipMap, M as MediaFile } from '../styles-BOJ93SAm.mjs';
export { D as DocDefaults, c as FontInfo, R as Relationship, d as RelationshipType, a as Style, e as StyleType, f as ThemeColorScheme, g as ThemeFont, h as ThemeFontScheme } from '../styles-BOJ93SAm.mjs';
import '../docx/wrapTypes.mjs';

/**
 * settings.xml parser
 *
 * Extracts document-wide settings the layout pipeline needs at render time.
 * We only read what's currently consumed; most of settings.xml (compatibility
 * flags, view state, autoformat) is irrelevant to layout.
 */
/** Document-wide settings parsed from `word/settings.xml`. */
interface DocumentSettings {
    /**
     * `w:defaultTabStop` (§17.6.13) — interval in twips between default tab
     * stops applied when a paragraph has no custom `w:tabs`. Word's default
     * if unspecified is 720 twips (0.5 inch).
     */
    defaultTabStop: number;
}

/**
 * Comprehensive TypeScript types for full DOCX document representation
 *
 * This barrel file re-exports all types from the split modules.
 * Existing imports from './types/document' continue to work unchanged.
 *
 * Module structure:
 * - colors.ts      — Color primitives, borders, shading
 * - formatting.ts  — Text, paragraph, and table formatting properties
 * - lists.ts       — Numbering and list definitions
 * - content.ts     — Content model (runs, images, shapes, tables, paragraphs, sections)
 * - styles.ts      — Styles, theme, fonts, relationships, media
 * @packageDocumentation
 * @public
 */

/**
 * Complete DOCX package structure
 */
interface DocxPackage {
    /** Document body */
    document: DocumentBody;
    /** Style definitions */
    styles?: StyleDefinitions;
    /** Theme */
    theme?: Theme;
    /** Numbering definitions */
    numbering?: NumberingDefinitions;
    /** Document-wide settings from `word/settings.xml` */
    settings?: DocumentSettings;
    /** Font table */
    fontTable?: FontTable;
    /** Footnotes (normal notes only — separators live in `footnoteSeparators`) */
    footnotes?: Footnote[];
    /** Endnotes (normal notes only — separators live in `endnoteSeparators`) */
    endnotes?: Endnote[];
    /**
     * Separator footnotes (`w:type="separator"` / `"continuationSeparator"` /
     * `"continuationNotice"`) kept out of `footnotes` so rendering/layout only
     * sees real notes. Retained for round-trip: Word rejects a footnotes part
     * whose separator notes are missing, so the serializer re-emits these ahead
     * of the normal notes.
     */
    footnoteSeparators?: Footnote[];
    /** Separator endnotes — see `footnoteSeparators`. */
    endnoteSeparators?: Endnote[];
    /** Headers by relationship ID */
    headers?: Map<string, HeaderFooter>;
    /** Footers by relationship ID */
    footers?: Map<string, HeaderFooter>;
    /** Document relationships */
    relationships?: RelationshipMap;
    /** Media files */
    media?: Map<string, MediaFile>;
    /** Document properties */
    properties?: {
        title?: string;
        subject?: string;
        creator?: string;
        keywords?: string;
        description?: string;
        lastModifiedBy?: string;
        revision?: number;
        created?: Date;
        modified?: Date;
    };
}
/**
 * Top-level parsed DOCX document — the result of `parseDocx(buffer)`.
 *
 * Wraps the unzipped DOCX package (`document.xml`, `styles.xml`, etc.),
 * the original buffer for round-trip saves, and any template variables /
 * parse warnings detected during ingestion.
 *
 * @example
 * ```ts
 * import { parseDocx } from '@eigenpal/docx-editor-core/headless';
 * const doc = await parseDocx(buffer);
 * console.log(doc.package.document.content.length);
 * ```
 */
interface Document {
    /** Parsed DOCX package — body, styles, numbering, theme, media, headers/footers. */
    package: DocxPackage;
    /** Original DOCX buffer. Kept for round-trip saves that preserve untouched parts. */
    originalBuffer?: ArrayBuffer;
    /** Detected docxtemplater variables (e.g. `{name}`, `{address}`). Populated when the document is recognized as a template. */
    templateVariables?: string[];
    /** Non-fatal parser diagnostics — malformed parts, unsupported features, fallbacks. */
    warnings?: string[];
}

export { type Document, DocumentBody, type DocumentSettings, type DocxPackage, Endnote, FontTable, Footnote, HeaderFooter, MediaFile, NumberingDefinitions, RelationshipMap, StyleDefinitions, Theme };
