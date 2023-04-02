/**
 * createElement returns a new DOM element based on the type and properties provided
 * 
 * Properties given to `props` with the prefix "on" will be treated as element event
 * listeners.
 * @param {string | Component} type The type of DOM element or Component class to create
 * @param {{ [key: string]: string | Function}} props The properties of the DOM element
 * @returns {HTMLElement}
 */
function createElement(type, props) {
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
        const rootElement = createElement('div', this.props);

        const countDisplay = createElement('p', { textContent: `Count: ${this.count}` });

        const countIncrementButton = createElement('button', {
            textContent: 'Increment',
            onClick: () => {
                this.count++;
                countDisplay.textContent = `Count: ${this.count}`;
            }
        });

        // Note that we could use our global render function,
        // but to save confusion with this class' render function, I've appended directly
        rootElement.appendChild(countDisplay);
        rootElement.appendChild(countIncrementButton);

        return rootElement;
    }
}

const App = (props) => {
    const rootElement = createElement('div', props);
    [
        createElement('h1', { textContent: 'Hello, World!' }),
        createElement(Counter, {})
    ].forEach((element) => render(element, rootElement));
    return rootElement;
}

const app = createElement(App, {});

render(app, document.getElementById('root'));
