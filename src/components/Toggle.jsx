import * as React from "../react";

export class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOn: false
        };
    }

    render() {
        const { isOn } = this.state;

        return <div>
            <p>Toggle is {isOn ? 'on' : 'off'}</p>
            <button onClick={() => this.setState({ isOn: true})}>On</button>
            <button onClick={() => this.setState({ isOn: false})}>Off</button>
        </div>
    }
}