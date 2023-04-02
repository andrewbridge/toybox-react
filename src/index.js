function createElement(type, props) {
    const element = document.createElement(type);
    Object.keys(props).forEach((name) => {
        element[name] = props[name];
    });
    return element;
}

function render(element, parentNode) {
    parentNode.appendChild(element);
}

const helloWorld = createElement('h1', { textContent: 'Hello, World!' });

let count = 0;
const countDisplay = createElement('p', { textContent: `Count: ${count}` });

const countIncrementButton = createElement('button', { textContent: 'Increment' });
countIncrementButton.addEventListener('click', () => {
    count++;
    countDisplay.textContent = `Count: ${count}`;
}, false);

[helloWorld, countDisplay, countIncrementButton].forEach((element) => render(element, document.getElementById('root')));
