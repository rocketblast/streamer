/* global Twitch */
import React, { Component, createRef } from 'react';

import { getId, isLessImportant, useChannel, useVideo, useCollection, setLowestQuality, once } from './Utils';

import AuthorizationContext from './AuthorizationContext.js';

import './IFrame.css';

// https://dev.twitch.tv/docs/embed/#embedding-video-and-clips

const fetchUser = (login, { token }) => fetch(`https://api.twitch.tv/helix/users?login=${ login }`, {
    headers: {
        'Authorization': `Bearer ${ token }`
    }
})
    .then(response =>response.json())
    .then(data => data.data.find(user => user.login === login));


class TwitchPlayer extends Component {
    constructor(props) {
        super(props);

        const { channel, video, collection } = props;

        this.ref = createRef();

        this.state = {
            id: getId('player')(props),
            options: {
                width: '100%',
                height: '100%',
                ...((useChannel(props) && { channel }) || (!useVideo(props) && { channel: 'monstercat' }) || {}),
                ...(useVideo(props) ? { video } : {}),
                ...(useCollection(props) ? { collection } : {}),
                // autoplay: false,
            },
            isLessImportant: isLessImportant(props)
        };
    }

    componentDidUpdate() {
        const { token: { access_token: token } = {}, channel } = this.props;
        const { user } = this.state;

        if (!user && token) {
            fetchUser(channel, { token })
                .then(user => {
                    console.log(user);
                    this.setState({ user })
                });
        }
    }

    componentDidMount() {
        const { channel, video, collection } = this.props;
        const { id, options, isLessImportant } = this.state;

        const player = new Twitch.Player(id, options);

        this.setState({
            player,
        });
        
        if (isLessImportant) player.setMuted(true);
        // player.setVolume(0.1);

        player.addEventListener(Twitch.Player.READY, () => {
            // These are big no-no's because everyone cares about security
            // I can however get the "offline" image from the API and replace the iframe with just that instead
            //
            // const node = this.ref.current;
            // console.log(player._bridge._iframe.contentWindow)
            // node.querySelector('iframe').contentWindow.document.body.querySelector('.hover-display').style.display//; = 'none';
            console.log('READY', player.isPaused())
        });

        player.addEventListener(Twitch.Player.PLAYING, once(() => {
            // setTimeout(() => player.pause(), 5000);
            if (isLessImportant) setLowestQuality(player);

            this.setState({
                status: 'playing'
            })

            console.log('PLAYING', player.isPaused(), player, player.getQualities(), player.getChannel(), player.getPlaybackStats(), arguments);
        }));

        player.addEventListener(Twitch.Player.ONLINE, () => {
            console.log('ONLINE', player.isPaused(), player.getChannel(), arguments)
            // went online again (if it has not been swapped out before)
        });
        player.addEventListener(Twitch.Player.OFFLINE, () => {
            console.log('OFFLINE', player.getChannel(), arguments)
            // went offline, load (possible) other live channel, toaster

            this.setState({
                status: 'offline'
            })
        });
    }

    handleClick = () => {
        const { player, status } = this.state;

        if (status) {
            const isPaused = player.isPaused()

            isPaused
                ? player.play()
                : player.pause();

            const nextStatus = isPaused
                ? 'playing'
                : 'paused';

            this.setState({
                status: nextStatus
            })
        }
    }

    render() {
        const { id, isLessImportant, user: { display_name: name } = {}, status } = this.state;

        const styles = {
            paddingBottom: `${ (9 / 16 * 100).toFixed(2) }%`,
        }

        return (
            <div style={ { position: 'relative' } }>
                <div className="root" style={ styles } id={ id } ref={ this.ref } />
                <div style={ {
                    position: 'absolute',
                    top: '100%',
                    color: 'gray',
                    padding: '10px 10px 0',
                    fontSize: isLessImportant
                        ? 'x-small'
                        : 'small',
                    display: 'flex',
                    justifyContent: 'space-between',
                    boxSizing: 'border-box',
                    width: '100%'
                } }>
                    <div>
                        <div style={ { color: 'white' } }>{ name }</div>
                        { !isLessImportant && name && <div>Title</div> }
                    </div>
                    { status && (
                        (status === 'paused' && <a onClick={ this.handleClick }>play</a>)
                        || (status === 'playing' && <a onClick={ this.handleClick }>pause</a>) 
                        || (status === 'offline' && 'offline')) }
                </div>
            </div>
        );
    }
}

export default props => (
    <AuthorizationContext.Consumer>
        { token => <TwitchPlayer { ...{ ...props, token } }/> }
    </AuthorizationContext.Consumer>
);
