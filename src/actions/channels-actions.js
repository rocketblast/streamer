export function addChannel (id) {
    return dispatch => dispatch({
        type: 'ADD_CHANNEL',
        data: {
            id
        }
    });
}
