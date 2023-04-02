/**
 * @typedef {import('./types')} VNode
 * @typedef {{ dom: HTMLElement, vNode: VNode, childRenderedVNodes: Array<RenderedVNode> }} RenderedVNode
 * */

import { TEXT_ELEMENT } from './react';

let rootRenderedVNode = null;
/**
 * Renders a vNode in the given parentNode (a DOM element)
 * @param {VNode} vNode The vNode to render
 * @param {HTMLElement} parentNode The DOM element to attach `vNode` to
 */
export function render(vNode, parentNode) {
    const prevRenderedVNode = rootRenderedVNode;
    const nextRenderedVNode = reconcile(parentNode, prevRenderedVNode, vNode);
    rootRenderedVNode = nextRenderedVNode;
}

/**
 * Finds the differences between a previously rendered vNode and a new vNode.
 * 
 * In its current form it can create previously unseen vNodes, remove previously
 * seen vNodes and replace previously seen vNodes with an entirely fresh version
 * 
 * @param {HTMLElement} parentDom The DOM element to change
 * @param {RenderedVNode} renderedVNode The previously rendered vNode to compare with vNode
 * @param {VNode} vNode The new vNode to compare with renderedVNode
 * @returns {RenderedVNode | null}
 */
function reconcile(parentDom, renderedVNode, vNode) {
    if (renderedVNode === null) {
        // Create new element in the DOM
        const newRenderedVNode = instantiate(vNode);
        parentDom.appendChild(newRenderedVNode.dom);
        return newRenderedVNode;
    } else if (vNode === null) {
        // Remove a previously rendered element from the DOM
        parentDom.removeChild(renderedVNode.dom);
        return null;
    } else {
        // Replace a previously rendered element with a brand new DOM element
        const newRenderedVNode = instantiate(vNode);
        parentDom.replaceChild(newRenderedVNode.dom, renderedVNode.dom);
        return newRenderedVNode;
    }
}

/**
 * Creates a RenderedVNode instance and underlying DOM element for the given vNode
 * 
 * @param {VNode} vNode The vNode to instantiate
 * @returns {RenderedVNode}
 */
function instantiate(vNode) {
    const { type, props } = vNode;

    if (typeof type === 'function' && type.prototype?.isComponentClass === true) {
        const componentInstance = new type();
        return instantiate(componentInstance.render());
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

    /** @type {Array<RenderedVNode>} */
    const childRenderedVNodes = props.children.map(instantiate);
    childRenderedVNodes.forEach((child) => {
        dom.appendChild(child.dom);
    });

    return { dom, vNode, childRenderedVNodes };
}