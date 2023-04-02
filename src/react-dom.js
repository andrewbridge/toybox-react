/** @typedef {import('./types')} VNode */

/**
 * Renders a DOM element in the given parentNode (also a DOM element)
 * @param {HTMLElement} element The element to render
 * @param {HTMLElement} parentNode The node to attach `element` to
 */
export function render(element, parentNode) {
    parentNode.appendChild(element);
}