/* global Twitch */
import React, { Component } from 'react';

import { getId, isLessImportant, useChannel, useVideo, useCollection, setLowestQuality, once } from './Utils';

import './Common.css';

// https://dev.twitch.tv/docs/embed/#embedding-video-and-clips

class TwitchPlayer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: getId('player')(props)
        };
    }

    componentDidMount() {
        const { channel, video, collection } = this.props;
        const { id } = this.state;

        const options = {
            width: '100%',
            height: '100%',
            ...((useChannel(this.props) && { channel }) || (!useVideo(this.props) && { channel: 'monstercat' }) || {}),
            ...(useVideo(this.props) ? { video } : {}),
            ...(useCollection(this.props) ? { collection } : {}),
            // autoplay: false,
        };

        const player = new Twitch.Player(id, options);
        
        if (isLessImportant(this.props)) player.setMuted(true);
        // player.setVolume(0.1);

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
        const { id } = this.state;

        const styles = {
            paddingBottom: `${ (9 / 16 * 100).toFixed(2) }%`,
        }

        return (
            <div style={ { position: 'relative' } }>
                <div className="root" style={ styles } id={id}/>
                <div style={ { position: 'absolute', top: '100%', color: 'silver', paddingTop: 5 } }>&nbsp;( &nbsp; ) <strong style={ { color: 'white', fontWeight: 'normal' } }>Channel</strong> Title</div>
            </div>
        );
    }
}

export default TwitchPlayer;
