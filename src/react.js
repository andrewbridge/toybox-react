/**
 * A Component encapsulates a stateful DOM element where the HTML element produced
 * is different depending on the state within.
 * 
 * Components are created with a `props` object to allow the HTML element to
 * have additional properties and attributes set to it.
 * 
 * Components produce an HTML element when its `render` function is called.
 */
export class Component {
    constructor(props) {
        this.props = props || {};
    }

    render() {}
}
// Every single component will have a property `isComponentClass` so we can detect them compared to other objects
Component.prototype.isComponentClass = true;

const createTextElement = (value) => document.createTextNode(value);

/**
 * createElement returns a new vDOM element based on the type and properties provided
 * 
 * Properties given to `props` with the prefix "on" will be treated as element event
 * listeners.
 * @typedef {{ type: string | Component, props: { [key: string]: string | Function, children: Array<VNode> }}} VNode
 * @param {string | Component | Function} type The type of vDOM element, Component class, or function component to create
 * @param {{ [key: string]: string | Function}} props The properties of the vDOM element
 * @param {Array<VNode | string | number>} children The child vDOM Elements to be nested within the component
 * @returns {VNode}
 */
export function createElement(type, props, ...children) {
    if (typeof type === 'function' && type.prototype?.isComponentClass !== true) {
        return type(props || {});
    }
    
    const mergedProps = Object.assign({}, props);

    const vNode = {
        type,
        props: {
            ...mergedProps,
            children: children.flat().map((child) => typeof child === 'object' ? child : createTextElement(child)),
        }
    };
    console.log(vNode);
    return vNode;
}

/**
 * Renders a DOM element in the given parentNode (also a DOM element)
 * @param {HTMLElement} element The element to render
 * @param {HTMLElement} parentNode The node to attach `element` to
 */
export function render(element, parentNode) {
    parentNode.appendChild(element);
}
