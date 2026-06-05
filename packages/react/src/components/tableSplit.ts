/**
 * Re-export from @som/docx-editor-core where the implementation now lives.
 * Kept for backward compatibility with in-package imports.
 */
export {
  type SplitCellDialogConfig,
  getSplitCellDialogConfig,
  splitActiveTableCell,
} from '@som/docx-editor-core/prosemirror/commands';
