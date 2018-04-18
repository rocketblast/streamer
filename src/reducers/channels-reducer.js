function channels(state = [], { type, data }) {
    switch (type) {
        case 'ADD_CHANNEL':
            const { id } = data;

            return [
                ...state,
                {
                    id
                }
            ];
        default:
            return state;
    }
}

export default channels;
