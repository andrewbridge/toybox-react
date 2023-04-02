import * as React from "../react";
import { Toggle } from "./Toggle";

export class Counter extends React.Component {
    count = 0;

    render() {
        const countDisplay = <p>Count: {this.count}</p>;

        const countIncrementButton = <button onClick={() => {
            this.count++;
            countDisplay.textContent = `Count: ${this.count}`;
        }}>Increment</button>;

        return <div>
            {countDisplay}
            {countIncrementButton}
            <Toggle />
        </div>
    }
}