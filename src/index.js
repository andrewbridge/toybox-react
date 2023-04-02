/**
 * createElement returns a new DOM element based on the type and properties provided
 * 
 * Properties given to `props` with the prefix "on" will be treated as element event
 * listeners.
 * @param {string} type The type of DOM element to create
 * @param {{ [key: string]: string | Function}} props The properties of the DOM element
 * @returns {HTMLElement}
 */
function createElement(type, props) {
    const element = document.createElement(type);

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
 * 
 */
class Component {
    constructor(props) {
        this.props = props || {};
    }

    render() {}
}

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

const helloWorld = createElement('h1', { textContent: 'Hello, World!' });

const counter1 = new Counter();
const counter2 = new Counter();

[helloWorld, counter1.render(), counter2.render()].forEach((element) => render(element, document.getElementById('root')));
