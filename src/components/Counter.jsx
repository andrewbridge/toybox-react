import * as React from "../react";
import { Toggle } from "./Toggle";

export class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        };
    }

    componentDidMount() {
        console.log('component mounted');
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('component updated', prevProps, prevState);
    }

    componentWillUnmount() {
        console.log('component unmounting');
    }

    render() {
        const { count } = this.state;

        if (count >= 10) return null;

        return <div className={Date.now()}>
            <p>Count: {count}</p>
            <button onClick={() => this.setState({ count: count + 1 })}>Increment</button>
            <Toggle />
        </div>
    }
}