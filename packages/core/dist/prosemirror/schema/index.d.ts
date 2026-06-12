import * as prosemirror_model from 'prosemirror-model';
import { a as ExtensionManager } from '../../types-RchZmPFN.js';
export { I as ImageAttrs, a as ImagePositionAttrs, P as ParagraphAttrs, T as TableAttrs, b as TableCellAttrs, c as TableRowAttrs } from '../../nodes-cZAxqmMz.js';
export { F as FontFamilyAttrs, a as FontSizeAttrs, H as HyperlinkAttrs, T as TextColorAttrs, U as UnderlineAttrs } from '../../marks-CjC9tF5k.js';
import 'prosemirror-state';
import '../../colors-C3vA7HUU.js';
import '../../formatting-_OXU8gLB.js';
import '../../content-E-cahBKn.js';
import '../../docx/wrapTypes.js';
import '../../watermark-DAcnAs_J.js';

declare const singletonManager: ExtensionManager;
declare const schema: prosemirror_model.Schema<any, any>;
/**
 * Export types for convenience
 */
type DocxSchema = typeof schema;
type DocxNode = ReturnType<typeof schema.node>;
type DocxMark = ReturnType<typeof schema.mark>;

export { type DocxMark, type DocxNode, type DocxSchema, schema, singletonManager };
