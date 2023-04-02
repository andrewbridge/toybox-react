const helloWorld = document.createElement('h1');
helloWorld.textContent = 'Hello, World!';

document.getElementById('root').appendChild(helloWorld);

let count = 0;
const countDisplay = document.createElement('p');
countDisplay.textContent = `Count: ${count}`;

document.getElementById('root').appendChild(countDisplay);

const countIncrementButton = document.createElement('button');
countIncrementButton.textContent = 'Increment';
countIncrementButton.addEventListener('click', () => {
    count++;
    countDisplay.textContent = `Count: ${count}`;
}, false);

document.getElementById('root').appendChild(countIncrementButton);