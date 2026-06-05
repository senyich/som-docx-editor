import { EditorView } from 'prosemirror-view';

/** @internal */
interface VisualLineState {
    stickyX: number | null;
    lastVisualLineIndex: number;
}
/** @internal */
declare function createVisualLineState(): VisualLineState;
/** @internal */
declare function getCaretClientX(container: HTMLElement, pmPos: number): number | null;
/** @internal */
declare function findLineElementAtPosition(container: HTMLElement, pmPos: number): HTMLElement | null;
/** @internal */
declare function findPositionOnLineAtClientX(lineEl: HTMLElement, clientX: number): number | null;
/**
 * Handle PM ArrowUp / ArrowDown with visual-line awareness + sticky
 * X. Returns true if the event was handled and PM should not run
 * its default behaviour. Mutates `state` so consecutive presses
 * keep the same sticky X.
 */
/** @internal */
declare function handleVisualLineKeyDown(state: VisualLineState, view: EditorView, event: KeyboardEvent, container: HTMLElement | null): boolean;

export { type VisualLineState, createVisualLineState, findLineElementAtPosition, findPositionOnLineAtClientX, getCaretClientX, handleVisualLineKeyDown };
