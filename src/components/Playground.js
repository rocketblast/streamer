import React from 'react';

// import TwitchChat from './Twitch/IFrameChat';
import TwitchPlayer from './Twitch/Player';

const Playground = () => {
    return (
        <div style={ { display: 'flex', paddingTop: 100 } }>
            <div style={ { boxSizing: 'border-box', background: '', width: '73%', paddingLeft: '6%' } }>
                <TwitchPlayer channel="monstercat" />
            </div>
            <div style={ {
                boxSizing: 'border-box',
                background: '',
                width: '27%',
                paddingLeft: '2%',
                paddingRight: '6%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
            } }>
                <TwitchPlayer channel="rocketblasttv" importance="less" />
                <TwitchPlayer channel="wizzlertv" importance="less" />
                <TwitchPlayer channel="anything4views" importance="less" />
            </div>
            {/*<TwitchChat />*/}
        </div>
    );
}

export default Playground;
