export { A as AgentContextOptions, S as ContextSelectionOptions, D as DocumentAgent, E as ExtendedSelectionContext, F as FormattedTextSegment, a as FormattingSummary, I as InsertHyperlinkOptions, b as InsertImageOptions, c as InsertTableOptions, d as InsertTextOptions, e as SelectionContextOptions, f as buildExtendedSelectionContext, g as buildSelectionContext, h as buildSelectionContextFromContext, i as createAgent, j as createAgentFromDocument, k as executeCommand, l as executeCommands, m as getAgentContext, n as getDocumentSummary, o as getSelectionFormattingSummary } from '../selectionContext-BPAqgNgk.js';
import { T as TextFormatting } from '../formatting-_OXU8gLB.js';
import { D as DocumentBody, P as Paragraph, H as Hyperlink, m as Run, T as Table, u as SdtProperties } from '../content-C8fc_tL6.js';
import { Position } from '../types/agentApi.js';
export { AIAction, AIActionRequest, AgentCommand, AgentContext, AgentResponse, SelectionContext as AgentSelectionContext, ApplyStyleCommand, ApplyVariablesCommand, DEFAULT_AI_ACTIONS, DeleteTextCommand, FormatParagraphCommand, FormatTextCommand, InsertHyperlinkCommand, InsertImageCommand, InsertParagraphBreakCommand, InsertTableCommand, InsertTextCommand, MergeParagraphsCommand, ParagraphContext, ParagraphOutline, Range, RemoveHyperlinkCommand, ReplaceTextCommand, SectionInfo, SetVariableCommand, SplitParagraphCommand, StyleInfo, SuggestedAction, comparePositions, createCollapsedRange, createCommand, createRange, getActionDescription, getActionLabel, isPositionInRange } from '../types/agentApi.js';
import { a as ContentControlFilter } from '../contentControlValues-DGDKD589.js';
export { C as ContentControlBoundError, b as ContentControlInfo, c as ContentControlLockedError, d as ContentControlNotFoundError, e as ContentControlTypeError, f as ContentControlValue, g as ContentControlValueError, h as findContentControl, i as findContentControls, j as formatSdtDate, k as getContentControlText, r as removeContentControl, s as setContentControlContent, l as setContentControlValue } from '../contentControlValues-DGDKD589.js';
import { Document } from '../types/document.js';
import '../selectiveSave-CWaPEv0B.js';
import '../docxInput-DTbCa48g.js';
import '../colors-C3vA7HUU.js';
import '../docx/wrapTypes.js';
import '../watermark-DAcnAs_J.js';
import '../styles-BWqX2AS-.js';

/**
 * Shared Text Utilities for Agent Module
 *
 * Common text extraction and manipulation utilities used by
 * context.ts, selectionContext.ts, and other agent-related code.
 *
 * Consolidates duplicated helper functions into a single location.
 */

/**
 * Get plain text from a paragraph
 */
declare function getParagraphText(paragraph: Paragraph): string;
/**
 * Get plain text from a run
 */
declare function getRunText(run: Run): string;
/**
 * Get plain text from a hyperlink
 */
declare function getHyperlinkText(hyperlink: Hyperlink): string;
/**
 * Get plain text from a table
 */
declare function getTableText(table: Table): string;
/**
 * Get plain text from document body
 */
declare function getBodyText(body: DocumentBody): string;
/**
 * Count words in text
 */
declare function countWords(text: string): number;
/**
 * Count characters in text
 */
declare function countCharacters(text: string, includeSpaces?: boolean): number;
/**
 * Get word count from document body
 */
declare function getBodyWordCount(body: DocumentBody): number;
/**
 * Get character count from document body
 */
declare function getBodyCharacterCount(body: DocumentBody): number;
/**
 * Get text before a position
 *
 * @param paragraphs - Array of paragraphs
 * @param position - Position to get text before
 * @param maxChars - Maximum characters to return
 * @returns Text before the position
 */
declare function getTextBefore(paragraphs: Paragraph[], position: Position, maxChars: number): string;
/**
 * Get text after a position
 *
 * @param paragraphs - Array of paragraphs
 * @param position - Position to get text after
 * @param maxChars - Maximum characters to return
 * @returns Text after the position
 */
declare function getTextAfter(paragraphs: Paragraph[], position: Position, maxChars: number): string;
/**
 * Get formatting at a specific position in a paragraph
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns Formatting at that position
 */
declare function getFormattingAtPosition(paragraph: Paragraph, offset: number): Partial<TextFormatting>;
/**
 * Check if position is within a hyperlink
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns True if position is in a hyperlink
 */
declare function isPositionInHyperlink(paragraph: Paragraph, offset: number): boolean;
/**
 * Get hyperlink at position
 *
 * @param paragraph - The paragraph to check
 * @param offset - Character offset in the paragraph
 * @returns The hyperlink at that position, or undefined
 */
declare function getHyperlinkAtPosition(paragraph: Paragraph, offset: number): Hyperlink | undefined;
/**
 * Check if style ID represents a heading
 *
 * @param styleId - Style ID to check
 * @returns True if it's a heading style
 */
declare function isHeadingStyle(styleId?: string): boolean;
/**
 * Parse heading level from style ID
 *
 * @param styleId - Style ID to parse
 * @returns Heading level (1-9) or undefined
 */
declare function parseHeadingLevel(styleId?: string): number | undefined;
/**
 * Check if document body has images
 *
 * @param body - Document body to check
 * @returns True if contains images
 */
declare function hasImages(body: DocumentBody): boolean;
/**
 * Check if document body has hyperlinks
 *
 * @param body - Document body to check
 * @returns True if contains hyperlinks
 */
declare function hasHyperlinks(body: DocumentBody): boolean;
/**
 * Check if document body has tables
 *
 * @param body - Document body to check
 * @returns True if contains tables
 */
declare function hasTables(body: DocumentBody): boolean;
/**
 * Get all paragraphs from document body
 *
 * @param body - Document body
 * @returns Array of paragraphs
 */
declare function getParagraphs(body: DocumentBody): Paragraph[];
/**
 * Get paragraph at index from document body
 *
 * @param body - Document body
 * @param index - Paragraph index (0-indexed)
 * @returns Paragraph or undefined
 */
declare function getParagraphAtIndex(body: DocumentBody, index: number): Paragraph | undefined;
/**
 * Get block index for a paragraph index
 *
 * @param body - Document body
 * @param paragraphIndex - Paragraph index
 * @returns Block index or -1 if not found
 */
declare function getBlockIndexForParagraph(body: DocumentBody, paragraphIndex: number): number;

/**
 * Repeating-section (w15:repeatingSection) support — add and remove repeated
 * items, the way Word's "+" affordance does. A repeating section is a block
 * content control whose `w:sdtPr` carries `<w15:repeatingSection>`; its direct
 * children are item controls each carrying `<w15:repeatingSectionItem>`.
 *
 * Adding clones an existing item (with a fresh, unique `w:id`) and inserts it
 * after; removing drops one item but keeps at least one. The w15 elements ride
 * in the captured raw `w:sdtPr` (they're unmodeled), so we detect and patch the
 * raw string rather than re-serializing.
 */

/** The control's raw `w:sdtPr` declares it a repeating section (the container). */
declare function isRepeatingSection(props: SdtProperties): boolean;
/** The control's raw `w:sdtPr` declares it a repeating-section item. */
declare function isRepeatingSectionItem(props: SdtProperties): boolean;
/** Raised when an operation targets something that isn't a repeating section/item. */
declare class RepeatingSectionError extends Error {
    constructor(message: string);
}
/**
 * Add a new repeating-section item, cloned from an existing one and inserted
 * after it. `afterIndex` is the item ordinal to clone/insert after (default:
 * the last item). Returns a new {@link Document}.
 */
declare function addRepeatingSectionItem(doc: Document, filter: ContentControlFilter, options?: {
    afterIndex?: number;
}): Document;
/**
 * Remove the repeating-section item at ordinal `index`. Keeps at least one item
 * (Word does not allow removing the last). Returns a new {@link Document}.
 */
declare function removeRepeatingSectionItem(doc: Document, filter: ContentControlFilter, index: number): Document;

export { ContentControlFilter, Position, RepeatingSectionError, addRepeatingSectionItem, countCharacters, countWords, getBlockIndexForParagraph, getBodyCharacterCount, getBodyText, getBodyWordCount, getFormattingAtPosition, getHyperlinkAtPosition, getHyperlinkText, getParagraphAtIndex, getParagraphText, getParagraphs, getRunText, getTableText, getTextAfter, getTextBefore, hasHyperlinks, hasImages, hasTables, isHeadingStyle, isPositionInHyperlink, isRepeatingSection, isRepeatingSectionItem, parseHeadingLevel, removeRepeatingSectionItem };
