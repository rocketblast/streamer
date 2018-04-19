import React, { Component } from 'react';

import './Typewriter.css';

class Typewriter extends Component {
    constructor(props) {
        super(props);

        console.log(props)

        this.state = {
            visible: false,
            text: '',
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeys);
    }

    handleKeys = ({ code, key, location }) => {
        let { visible, text } = this.state;

        console.log(key, code, location, !visible && ['Enter', 'Space'].includes(code));
        visible = (!visible && ['Enter', 'Space'].includes(code)) || // show
            (visible && !['Enter', 'Escape'].includes(code) && !(code === 'Space' && text.length === 0)); // hide

        if (this.props.onReturn && !visible && code === 'Enter') this.props.onReturn(text);

        text = (visible && key.length === 1 && `${ text }${ key }`.replace(/^[ ]*/, '')) ||
            (visible && code === 'Backspace' && text.slice(0, -1)) || // Can't remove entire string, need to re-write the logic a bit later
            (visible && text) ||
            '';

        this.setState({
            visible,
            text,
        })
    }

    render() {
        const { visible, text } = this.state;

        return <div className={ `Typewriter${ !visible ? ' Typewriter-hidden' : '' }` }>{ text }&nbsp;</div>;
    }
}

export default Typewriter;
