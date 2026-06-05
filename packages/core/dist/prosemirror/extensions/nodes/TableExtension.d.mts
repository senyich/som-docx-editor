import { N as NodeExtension, E as Extension, A as AnyExtension } from '../../../types-RchZmPFN.mjs';
export { B as BorderPreset, a as BorderSpec, T as TableContextInfo, g as getTableContext, b as goToNextCell, c as goToPrevCell, i as isInTable } from '../../../borders-BH_GoYU3.mjs';
import 'prosemirror-model';
import 'prosemirror-state';
import '../../../colors-C3vA7HUU.mjs';

declare const TableNodeExtension: (options?: Partial<Record<string, unknown>> | undefined) => NodeExtension;
declare const TableRowExtension: (options?: Partial<Record<string, unknown>> | undefined) => NodeExtension;
declare const TableCellExtension: (options?: Partial<Record<string, unknown>> | undefined) => NodeExtension;
declare const TableHeaderExtension: (options?: Partial<Record<string, unknown>> | undefined) => NodeExtension;
declare const TablePluginExtension: (options?: Partial<Record<string, unknown>> | undefined) => Extension;
declare function createTableExtensions(): AnyExtension[];

export { TableCellExtension, TableHeaderExtension, TableNodeExtension, TablePluginExtension, TableRowExtension, createTableExtensions };
