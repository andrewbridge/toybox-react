import * as React from '../react';
import { Counter } from './Counter';

export const App = (props) => React.createElement('div', props, [
    React.createElement('h1', { textContent: 'Hello, World!' }),
    React.createElement(Counter, {})
]);