/** @typedef {import('./types')} VNode */

import { TEXT_ELEMENT } from './react';

/**
 * Renders a vNode in the given parentNode (a DOM element)
 * @param {VNode} vNode The vNode to render
 * @param {HTMLElement} parentNode The DOM element to attach `vNode` to
 */
export function render(vNode, parentNode) {
    const { type, props } = vNode;

    if (typeof type === 'function' && type.prototype?.isComponentClass === true) {
        const componentInstance = new type();
        return render(componentInstance.render(), parentNode);
    }

    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement ? document.createTextNode(props.nodeValue) : document.createElement(type)

    const isEvent = (name) => name.startsWith('on');
    const isAttribute = (name) => !isEvent(name);

    Object.keys(props).filter(isAttribute).forEach((name) => {
        dom[name] = props[name];
    });

    Object.keys(props).filter(isEvent).forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, props[name], false);
    });

    props.children.forEach((child) => render(child, dom));

    return parentNode.appendChild(dom);
}