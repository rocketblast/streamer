/* global Twitch */
import React, { Component } from 'react';

import { getId, useChannel, useVideo, useCollection } from './Utils';

import './IFrame.css';

// const useChat = ({ layout }) => layout !== 'video';

// https://dev.twitch.tv/docs/embed/#embedding-everything

// The problem with this method is that I cannot get methods of the player to work. I haven't debugged the code though, might be able to get it working but the actual Player API seems to work (a little) better

class TwitchEmbed extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: getId('embed')(props)
        };
    }
    componentDidMount() {
        const { channel, video, collection } = this.props;

        const options = {
            width: '100%', // 940
            height: '100%', // 480
            ...((useChannel(this.props) && { channel }) || (!useVideo(this.props) && { channel: 'monstercat' }) || {}),
            ...(useVideo(this.props) ? { video } : {}),
            ...(useCollection(this.props) ? { collection } : {}),
            // allowfullscreen: false, // true (does not seem to have any effect)
            // ...(useChat(this.props) ? { chat: 'mobile' } : {}), // default
            // ...(useChat(this.props) ? { 'font-size': 'large' } : {}), // small
            layout: 'video', // 'video-and-chat'
            // theme: 'dark', // 'light'
            autoplay: false // undocumented (does not seem to work)
        };

        const embed = new Twitch.Embed(this.state.id, options);

        embed.addEventListener(Twitch.Embed.AUTHENTICATE, user => console.log(`${ user.login } just logged in`));
        embed.addEventListener(Twitch.Embed.VIDEO_PLAY, ({ sessionId }) => console.log(`video started playing (${ sessionId })`, sessionId));
        embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
            const player = embed.getPlayer();
            // player.play(); // Since the option autoplay does not work there is little use for this...
            setTimeout(player.pause, 5000);
            console.log(player, player.getQualities());
        });
        // TODO: Add clean-up of these events
    }

    render() {
        const styles = {
            paddingBottom: `${ (9 / 16 * 100).toFixed(2) }%`,
        }

        return <div className="root" style={ styles } id={ this.state.id }/>;
    }
}

export default TwitchEmbed;
