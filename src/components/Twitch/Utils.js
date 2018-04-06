export const getId = (player) => ({ channel, video, collection }) => `twitch-${ player }-${ channel || (collection && video && `${ collection }-${ video }`) || video }`;

export const isLessImportant = ({ importance }) => importance === 'less'

export const useChannel = ({ channel }) => channel;

export const useVideo = ({ channel, video }) => !channel && video;

export const useCollection = ({ channel, video, collection }) => !channel && video && collection;

const getLowestQuality = (qualities) => qualities.reduce((acc, { group: quality, bandwidth }) => {
    if (!acc || !acc.bandwidth || bandwidth < acc.bandwidth) {
        acc = {
            quality,
            bandwidth,
        };
    }

    return acc;
}).quality;

export const setLowestQuality = (player) => {
    const current = player.getQuality()
    const lowest = getLowestQuality(player.getQualities());

    if (lowest !== current) player.setQuality(lowest);
};

export const once = (fn, context) => { // cred: https://davidwalsh.name/javascript-once
    let result;

    return () => {
        if (fn) {
            result = fn.apply(context || this, arguments );
            fn = null;
        }

        return result;
    }
}
