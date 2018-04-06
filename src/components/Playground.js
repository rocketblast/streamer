import React from 'react';

// import TwitchChat from './Twitch/IFrameChat';
import TwitchPlayer from './Twitch/Player';

const Playground = () => {
    const spacing = 50;

    return (
        <div style={ { display: 'flex' } }>
            <div style={ { boxSizing: 'border-box', background: '', width: `calc(75.3% - ${ (spacing / 2).toFixed(2) }px)`, paddingLeft: spacing } }>
                <TwitchPlayer channel="monstercat" />
            </div>
            <div style={ { boxSizing: 'border-box', background: '', width: `calc(24.7% - ${ (spacing / 2).toFixed(2) }px)`, paddingLeft: spacing } }>
                <TwitchPlayer channel="rocketblasttv" importance="less" />
                <div style={ { height: spacing, content: ' ' } } />
                <TwitchPlayer channel="wizzlertv" importance="less" />
                <div style={ { height: spacing, content: ' ' } } />
                <TwitchPlayer channel="anything4views" importance="less" />
            </div>
            {/*<TwitchChat />*/}
        </div>
    );
}

export default Playground;
