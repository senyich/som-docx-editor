import { Plugin, PluginKey, EditorState } from 'prosemirror-state';
import { S as StyleDefinitions } from './styles-BWqX2AS-.js';
import { StyleResolver } from './prosemirror/styles/index.js';

/**
 * documentStyles plugin — makes the document's StyleResolver reachable from
 * ProseMirror commands.
 *
 * Styles otherwise flow one way (Document → PM) at load time: `toProseDoc`
 * bakes resolved formatting into nodes and discards the resolver. Some
 * commands need the live style table though — the Enter handler looks up a
 * paragraph style's `w:next` to switch to body text after a heading. This
 * plugin parks the resolver in plugin state so those commands can read it
 * via `getDocumentStyleResolver(state)`.
 *
 * The host (React `HiddenProseMirror` / `HiddenHeaderFooterPMs`, Vue
 * `useDocxEditor`) passes the same styles it hands to `toProseDoc` and adds
 * this plugin when creating the EditorState. When absent, style-aware
 * commands fall back to their style-agnostic behavior.
 */

declare const documentStylesKey: PluginKey<StyleResolver | null>;
/**
 * Create the plugin holding a StyleResolver for the document's `styles` for
 * the lifetime of the EditorState. The resolver is fixed per document load;
 * loading a new document recreates the state (and thus this plugin) with a
 * fresh resolver. Accepts a pre-built resolver too, for callers that already
 * have one.
 */
declare function createDocumentStylesPlugin(styles: StyleDefinitions | StyleResolver | null | undefined): Plugin;
/** Read the document's StyleResolver, or null when the plugin isn't installed. */
declare function getDocumentStyleResolver(state: EditorState): StyleResolver | null;

export { createDocumentStylesPlugin as c, documentStylesKey as d, getDocumentStyleResolver as g };
