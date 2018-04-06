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
        };

        const player = new Twitch.Player(id, options);
        
        if (isLessImportant(this.props)) player.setMuted(true);

        player.addEventListener(Twitch.Player.PLAYING, once(() => {
            // setTimeout(() => player.pause(), 5000);
            if (isLessImportant(this.props)) setLowestQuality(player);

            console.log(player, player.getQualities());
        }));

        // player.setVolume(0.1);
    }

    render() {
        const { id } = this.state;

        const styles = {
            paddingBottom: `${ (9 / 16 * 100).toFixed(2) }%`,
        }

        return <div className="root" style={ styles } id={id}/>;
    }
}

export default TwitchPlayer;
