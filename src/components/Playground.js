import React, { Component } from 'react';

import AuthorizationContext from './Twitch/AuthorizationContext.js';
// import TwitchChat from './Twitch/IFrameChat';
import TwitchPlayer from './Twitch/Player';

class Playground extends Component {
    constructor(props) {
        super(props);

        this.state = {};
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

    render() {
        return (
            <AuthorizationContext.Provider value={ this.state.token }>
                <div style={ { display: 'flex', paddingTop: 100 } }>
                    <div style={ { boxSizing: 'border-box', background: '', width: '73%', paddingLeft: '6%' } }>
                        <TwitchPlayer channel="monstercat" />
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
        );
    }
}

export default Playground;
