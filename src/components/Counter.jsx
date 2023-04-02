import * as React from "../react";
import { Toggle } from "./Toggle";

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    render() {
        const { count } = this.state;
        return <div>
            <p>Count: {count}</p>
            <button onClick={() => this.setState({ count: count + 1 })}>Increment</button>
            <Toggle />
        </div>
    }
}