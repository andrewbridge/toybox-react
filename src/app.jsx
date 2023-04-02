import * as React from "./react";
import * as ReactDOM from './react-dom';
import { App } from "./components/App";

let interations = 0;
setInterval(() => {
    if (interations > 10) {
        return ReactDOM.render(null, document.getElementById('root'));
    }
    ReactDOM.render(<p>{Date.now()}</p>, document.getElementById('root'));
    interations++;
}, 1000);
