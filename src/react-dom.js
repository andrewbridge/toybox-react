/**
 * @typedef {import('./types')} VNode
 * @typedef {{ dom: HTMLElement, vNode: VNode, childRenderedVNodes: Array<RenderedVNode>, componentInstance?: InstanceType<Component> }} RenderedVNode
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
    } else if (renderedVNode.vNode.type !== vNode.type) {
        // Replace a previously rendered element with a brand new DOM element
        const newRenderedVNode = instantiate(vNode);
        parentDom.replaceChild(newRenderedVNode.dom, renderedVNode.dom);
        return newRenderedVNode;
    } else if (typeof vNode.type === 'string') {
        // Update a previously rendere element from the DOM
        updateDomProperties(renderedVNode.dom, renderedVNode.vNode.props, vNode.props);
        renderedVNode.childRenderedVNodes = reconcileChildren(renderedVNode, vNode);
        renderedVNode.vNode = vNode;
        return renderedVNode;
    } else {
        renderedVNode.componentInstance.props = vNode.props;
        const childVNode = renderedVNode.componentInstance.render();
        const oldChildRenderedVNode = renderedVNode.childRenderedVNodes[0];

        if (childVNode === null) {
            renderedVNode.componentInstance.componentWillUnmount();
        }

        const childRenderedVNode = reconcile(parentDom, oldChildRenderedVNode, childVNode);
        
        return Object.assign(renderedVNode, { dom: childRenderedVNode?.dom || null, vNode, childRenderedVNodes: [childRenderedVNode] });
    }
}

/**
 * Compares two vNodes' child nodes to update and remove each node as necessary.
 * 
 * @param {RenderedVNode} renderedVNode The previously rendered vNode to compare with vNode
 * @param {VNode} vNode The new vNode to compare with renderedVNode
 */
function reconcileChildren(renderedVNode, vNode) {
    const { dom, childRenderedVNodes } = renderedVNode;
    const nextChildVNodes = vNode.props.children;
    const newChildRenderedVNodes = [];
    const count = Math.max(childRenderedVNodes.length, nextChildVNodes.length);
    for (let i = 0; i < count; i++) {
        const childRenderedVNode = childRenderedVNodes[i] || null;
        const childVNode = nextChildVNodes[i] || null;
        const newChildRenderedVNode = reconcile(dom, childRenderedVNode, childVNode);
        newChildRenderedVNodes.push(newChildRenderedVNode);
    }
    return newChildRenderedVNodes;
}

/**
 * Creates a new instance of a class component and attaches ReactDOM data and hooks
 * to the instance.
 * 
 * @param {VNode} vNode The vNode to create a component instance for.
 * @param {RenderedVNode} renderedVNode A reference to the rendered vNode to allow access via the instance.
 * @returns {InstanceType<Component>}
 */
function createComponentInstance(vNode, renderedVNode) {
    const { type, props } = vNode;
    const componentInstance = new type(props);
    componentInstance.__renderedVNode = renderedVNode;
    componentInstance.__triggerUpdate = updateComponentInstance;
    return componentInstance;
}

/**
 * Handles re-rendering an existing component instance following an update to the instance.
 * 
 * @param {InstanceType<Component>} componentInstance 
 * @param {{ [key: string]: unknown }} previousState 
 */
function updateComponentInstance(componentInstance, previousState) {
    const previousProps = componentInstance.props;
    const renderedVNode = componentInstance.__renderedVNode;
    const parentDom = renderedVNode.dom.parentNode;
    const vNode = renderedVNode.vNode;
    const { dom } = reconcile(parentDom, renderedVNode, vNode);
    if (dom !== null) {
        componentInstance.componentDidUpdate(previousProps, previousState)
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
        const renderedVNode = {};
        const componentInstance = createComponentInstance(vNode, renderedVNode);
        const childVNode = componentInstance.render();
        const childRenderedVNode = instantiate(childVNode);
        if (childVNode !== null) {
            componentInstance.componentDidMount();
        }

        return Object.assign(renderedVNode, { dom: childRenderedVNode.dom, vNode, childRenderedVNodes: [childRenderedVNode], componentInstance });
    }

    const isTextElement = type === TEXT_ELEMENT;
    const dom = isTextElement ? document.createTextNode(props.nodeValue) : document.createElement(type)

    updateDomProperties(dom, null, props);

    /** @type {Array<RenderedVNode>} */
    const childRenderedVNodes = props.children.map(instantiate);
    childRenderedVNodes.forEach((child) => {
        dom.appendChild(child.dom);
    });

    return { dom, vNode, childRenderedVNodes };
}

function updateDomProperties(dom, prevProps, nextProps) {
    const isEvent = (name) => name.startsWith('on');
    const isAttribute = (name) => !isEvent(name);

    if (prevProps !== null) {
        // Remove event listeners
        Object.keys(prevProps).filter(isEvent).forEach(name => {
            const eventType = name.toLowerCase().substring(2);
            dom.removeEventListener(eventType, prevProps[name]);
        });

        // Remove attributes
        Object.keys(prevProps).filter(isAttribute).forEach(name => {
            dom[name] = null;
        });
    }

    Object.keys(nextProps).filter(isAttribute).forEach((name) => {
        dom[name] = nextProps[name];
    });

    Object.keys(nextProps).filter(isEvent).forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        dom.addEventListener(eventType, nextProps[name], false);
    });
}