/**
 * @som/docx-editor-react
 *
 * Curated root entry for the documented React editor API. Advanced surfaces
 * stay public through explicit subpaths:
 * - `@som/docx-editor-react/ui`
 * - `@som/docx-editor-react/dialogs`
 * - `@som/docx-editor-react/hooks`
 * - `@som/docx-editor-react/plugin-api`
 *
 * Framework-agnostic document utilities live in `@som/docx-editor-core`.
 * Agent/MCP surfaces live in `@som/docx-editor-agents`.
 *
 * @packageDocumentation
 * @public
 */

export const VERSION = '0.0.2';

// Main editor contract
export {
  DocxEditor,
  type DocxEditorProps,
  type DocxEditorRef,
  type EditorMode,
} from './components/DocxEditor';
export { renderAsync, type RenderAsyncOptions, type DocxEditorHandle } from './renderAsync';

// Document factory helpers — re-exported from `@som/docx-editor-core` so
// the common "spawn a blank editor" affordance is available without forcing
// consumers to add `-core` to their dependency tree alongside `-react`.
export {
  createEmptyDocument,
  createDocumentWithText,
  type CreateEmptyDocumentOptions,
} from '@som/docx-editor-core';

// i18n contract — runtime only. Locale string types (LocaleStrings,
// Translations, PartialLocaleStrings, TranslationKey) live in
// `@som/docx-editor-i18n`; import them from there.
export { LocaleProvider, useTranslation, type LocaleProviderProps } from './i18n';
