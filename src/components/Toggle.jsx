import * as React from "../react";

export class Toggle extends React.Component {
    isOn = false;

    render() {
        const toggleDisplay = <p>Toggle is {this.isOn ? 'on' : 'off'}</p>;

        const toggleOn = <button onClick={(event) => {
            this.isOn = true;
            toggleDisplay.textContent = `Toggle is on`;
        }}>On</button>;

        const toggleOff = <button onClick={(event) => {
            this.isOn = false;
            toggleDisplay.textContent = `Toggle is off`;
        }}>Off</button>;

        return <div>
            {toggleDisplay}
            {toggleOn}
            {toggleOff}
        </div>
    }
}