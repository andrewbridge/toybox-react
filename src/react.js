/** @typedef {import('./types')} VNode */

/**
 * A Component encapsulates a stateful vDOM element where the vDOM element produced
 * is different depending on the state within.
 * 
 * Components are created with a `props` object to allow the vDOM element to
 * have additional properties and attributes set to it.
 * 
 * Components produce a VNode element when its `render` function is called.
 * 
 * vDOM renderers can add a __triggerUpdate function to component instance to receive
 * calls when internal state is updated.
 */
export class Component {
    constructor(props) {
        this.props = props || {};
        this.state = this.state || {};
    }

    componentDidMount() {}

    componentDidUpdate(previousProps, previousState) {}

    componentWillUnmount() {}

    setState(partialState) {
        const previousState = this.state;
        this.state = Object.assign({}, this.state, partialState);
        if (typeof this.__triggerUpdate === 'function') this.__triggerUpdate(this, previousState);
    }

    render() {}
}
// Every single component will have a property `isComponentClass` so we can detect them compared to other objects
Component.prototype.isComponentClass = true;

export const TEXT_ELEMENT = 'TEXT_ELEMENT';

/**
 * createTextElement returns a VNode for a primitive child like a string or number.
 * 
 * @param {string | number} value The value the VNode will contain
 * @returns {VNode}
 */
const createTextElement = (value) => createElement(TEXT_ELEMENT, { nodeValue: value });

/**
 * createElement returns a new vDOM element based on the type and properties provided
 * 
 * Properties given to `props` with the prefix "on" will be treated as element event
 * listeners.
 * 
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
            children: children
                .flat()
                .filter((child) => child !== false && child !== null) // Ignore false and null children
                .map((child) => typeof child === 'object' ? child : createTextElement(child)),
        }
    };
    
    return vNode;
}
