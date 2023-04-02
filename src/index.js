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

function render(element, parentNode) {
    parentNode.appendChild(element);
}

const helloWorld = createElement('h1', { textContent: 'Hello, World!' });

let count = 0;
const countDisplay = createElement('p', { textContent: `Count: ${count}` });

const countIncrementButton = createElement('button', {
    textContent: 'Increment',
    onClick: () => {
        count++;
        countDisplay.textContent = `Count: ${count}`;
    }
});

[helloWorld, countDisplay, countIncrementButton].forEach((element) => render(element, document.getElementById('root')));
