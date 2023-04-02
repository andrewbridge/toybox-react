import * as React from "./react";
import { App } from "./components/App";

const app = React.createElement(App, {});

React.render(app, document.getElementById('root'));
