import * as React from "../react";

export class Counter extends React.Component {
    count = 0;

    render() {
        const countDisplay = React.createElement('p', { textContent: `Count: ${this.count}` });

        const countIncrementButton = React.createElement('button', {
            textContent: 'Increment',
            onClick: () => {
                this.count++;
                countDisplay.textContent = `Count: ${this.count}`;
            }
        });

        return React.createElement('div', this.props, [
            countDisplay,
            countIncrementButton
        ]);
    }
}