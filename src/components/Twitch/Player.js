/* global Twitch */
import React, { Component, createRef } from 'react';

import { getId, isLessImportant, useChannel, useVideo, useCollection, setLowestQuality, once } from './Utils';

import AuthorizationContext from './AuthorizationContext.js';

import './Common.css';

// https://dev.twitch.tv/docs/embed/#embedding-video-and-clips

class TwitchPlayer extends Component {
    constructor(props) {
        super(props);

        this.ref = createRef();

        this.state = {
            key: getId('player')(props),
        };
    }

    componentWillUpdate({ token: { access_token }, channel }) {
        const { token } = this.props;

        if (!token && access_token && channel) {
            fetch(`https://api.twitch.tv/helix/users?login=${channel}`, {
                headers: {
                    'Authorization': `Bearer ${ access_token }`
                }
            })
                .then(response => response.json())
                .then(data => this.setState(state => ({
                    user: data.data[0]
                })));
                //.catch(error => console.log(error))
        }
    }

    componentDidMount() {
        const { channel, video, collection } = this.props;
        const { key } = this.state;

        const options = {
            width: '100%',
            height: '100%',
            ...((useChannel(this.props) && { channel }) || (!useVideo(this.props) && { channel: 'monstercat' }) || {}),
            ...(useVideo(this.props) ? { video } : {}),
            ...(useCollection(this.props) ? { collection } : {}),
            // autoplay: false,
        };

        const player = new Twitch.Player(key, options);
        
        if (isLessImportant(this.props)) player.setMuted(true);
        // player.setVolume(0.1);

        player.addEventListener(Twitch.Player.READY, () => {
            // These are big no-no's because everyone cares about security
            // I can however get the "offline" image from the API and replace the iframe with just that instead
            //
            // const node = this.ref.current;
            // console.log(player._bridge._iframe.contentWindow)
            // node.querySelector('iframe').contentWindow.document.body.querySelector('.hover-display').style.display//; = 'none';
        });

        player.addEventListener(Twitch.Player.PLAYING, once(() => {
            // setTimeout(() => player.pause(), 5000);
            if (isLessImportant(this.props)) setLowestQuality(player);

            console.log('PLAYING', player, player.getQualities(), player.getChannel(), player.getPlaybackStats(), arguments);
        }));

        player.addEventListener(Twitch.Player.ONLINE, () => {
            console.log('ONLINE', player.getChannel(), arguments)
            // went online again (if it has not been swapped out before)
        });
        player.addEventListener(Twitch.Player.OFFLINE, () => {
            console.log('OFFLINE', player.getChannel(), arguments)
            // went offline, load (possible) other live channel, toaster
        });
    }

    render() {
        const { key, user: { display_name: name } = {} } = this.state;

        const styles = {
            paddingBottom: `${ (9 / 16 * 100).toFixed(2) }%`,
        }

        return (
            <div style={ { position: 'relative' } }>
                <div className="root" style={ styles } id={ key } ref={ this.ref }/>
                <div style={ { position: 'absolute', top: '100%', color: 'gray', paddingTop: 5 } }>&nbsp;( &nbsp; ) <strong style={ { color: 'white', fontWeight: 'normal' } }>{ name }</strong> Title</div>
            </div>
        );
    }
}

export default props => (
    <AuthorizationContext.Consumer>
        { token => <TwitchPlayer { ...{ ...props, token } }/> }
    </AuthorizationContext.Consumer>
);
