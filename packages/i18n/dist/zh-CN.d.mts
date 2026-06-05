import { PartialLocaleStrings } from './index.mjs';

/**
 * Simplified Chinese (`zh-CN`) locale strings. Community-maintained; null leaves fall back to English.
 *
 * Identical content to the named `zhCN` export from the package root;
 * this subpath just lets bundlers code-split it.
 *
 * @public
 */
declare const zhCN: PartialLocaleStrings;

export { zhCN as default, zhCN };
