import * as React from "../react";

export class Counter extends React.Component {
    count = 0;

    render() {
        const countDisplay = <p textContent={`Count: ${this.count}`} />;

        const countIncrementButton = <button onClick={() => {
            this.count++;
            countDisplay.textContent = `Count: ${this.count}`;
        }} textContent="Increment" />;

        return <div>
            {countDisplay}
            {countIncrementButton}
        </div>
    }
}