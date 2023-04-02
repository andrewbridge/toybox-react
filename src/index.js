/**
 * createElement returns a new DOM element based on the type and properties provided
 * 
 * Properties given to `props` with the prefix "on" will be treated as element event
 * listeners.
 * @param {string | Component | Function} type The type of DOM element, Component class, or function component to create
 * @param {{ [key: string]: string | Function}} props The properties of the DOM element
 * @param {Array<HTMLElement>} children The child HTML Elements to be nested within the component
 * @returns {HTMLElement}
 */
function createElement(type, props, ...children) {
    let element;
    if (typeof type === 'function' && type.prototype?.isComponentClass === true) {
        const componentInstance = new type();
        element = componentInstance.render();
    } else if (typeof type === 'function') {
        element = type(props);
    } else {
        element = document.createElement(type);
    }

    const isEvent = (name) => name.startsWith('on');
    const isAttribute = (name) => !isEvent(name);

    Object.keys(props).filter(isAttribute).forEach((name) => {
        element[name] = props[name];
    });

    Object.keys(props).filter(isEvent).forEach((name) => {
        const eventType = name.toLowerCase().substring(2);
        element.addEventListener(eventType, props[name], false);
    });

    children.flat().forEach((child) => element.appendChild(child));

    return element;
}

/**
 * Renders a DOM element in the given parentNode (also a DOM element)
 * @param {HTMLElement} element The element to render
 * @param {HTMLElement} parentNode The node to attach `element` to
 */
function render(element, parentNode) {
    parentNode.appendChild(element);
}

/**
 * A Component encapsulates a stateful DOM element where the HTML element produced
 * is different depending on the state within.
 * 
 * Components are created with a `props` object to allow the HTML element to
 * have additional properties and attributes set to it.
 * 
 * Components produce an HTML element when its `render` function is called.
 */
class Component {
    constructor(props) {
        this.props = props || {};
    }

    render() {}
}
// Every single component will have a property `isComponentClass` so we can detect them compared to other objects
Component.prototype.isComponentClass = true;

class Counter extends Component {
    count = 0;

    render() {
        const countDisplay = createElement('p', { textContent: `Count: ${this.count}` });

        const countIncrementButton = createElement('button', {
            textContent: 'Increment',
            onClick: () => {
                this.count++;
                countDisplay.textContent = `Count: ${this.count}`;
            }
        });

        return createElement('div', this.props, [
            countDisplay,
            countIncrementButton
        ]);
    }
}

const App = (props) => createElement('div', props, [
    createElement('h1', { textContent: 'Hello, World!' }),
    createElement(Counter, {})
]);

const app = createElement(App, {});

render(app, document.getElementById('root'));
