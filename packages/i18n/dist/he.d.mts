import { PartialLocaleStrings } from './index.mjs';

/**
 * Hebrew (`he`) locale strings. Community-maintained; null leaves fall back to English.
 *
 * Identical content to the named `he` export from the package root;
 * this subpath just lets bundlers code-split it.
 *
 * @public
 */
declare const he: PartialLocaleStrings;

export { he as default, he };
