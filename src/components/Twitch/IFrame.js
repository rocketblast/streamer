import React from 'react';

// https://dev.twitch.tv/docs/embed/#embedding-video-and-clips

const TwitchIFrame = () => (
    <iframe
        src="http://player.twitch.tv/?channel=dallas&muted=true"
        height="720"
        width="1280"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true">
    </iframe>
);

export default TwitchIFrame;
