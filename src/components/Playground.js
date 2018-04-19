import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addChannel } from '../actions/channels-actions';

import AuthorizationContext from './Twitch/AuthorizationContext.js';
// import TwitchChat from './Twitch/IFrameChat';
import TwitchPlayer from './Twitch/Player';
import Icon from './Icons';
import Typewriter from './Typewriter';

class Playground extends Component {
    constructor(props) {
        super(props);

        this.state = {
            main: 'monstercat',
        };
    }

    componentDidMount() {
        fetch(`https://id.twitch.tv/oauth2/token?client_id=mh7ueh4ek1qokl273t606xkeob7f1xo&client_secret=${ process.env.REACT_APP_TWITCH_SECRET }&grant_type=client_credentials`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(data => this.setState({
                token: data,
            }));
    }

    handleReturn = (text) => {
        this.props.dispatch(addChannel(text));
    }

    render() {
        const { main } = this.state;

        console.log(main)

        return (
            <div>
                <div id="ad" style={ { height: 160, background: 'rgba(0, 0, 0, .2)' } }></div>
                <AuthorizationContext.Provider value={ this.state.token }>
                    <div style={ { display: 'flex', paddingTop: 50 } }>
                        <div style={ { boxSizing: 'border-box', background: '', width: '73%', paddingLeft: '6%' } }>
                            <TwitchPlayer channel={ main } />
                        </div>
                        <div style={ {
                            boxSizing: 'border-box',
                            background: '',
                            width: '27%',
                            paddingLeft: '4%',
                            paddingRight: '6%',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                        } }>
                            <TwitchPlayer channel="rocketblasttv" importance="less" />
                            <TwitchPlayer channel="wizzlertv" importance="less" />
                            <TwitchPlayer channel="kreamylol" importance="less" />
                        </div>
                        {/*<TwitchChat />*/}
                    </div>
                </AuthorizationContext.Provider>
                <div style={ { position: 'fixed', top: 50, left: '6%', width: 60, height: 60, fill: 'rgba(255, 255, 255, .2)' } } onClick={ () => this.setState({ main: 'rocketblasttv' }) }><Icon name="rocketblast"/></div>
                <Typewriter onReturn={ this.handleReturn }/>
            </div>
        );
    }
}

export default connect()(Playground);
