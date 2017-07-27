const initialState = {
    pending: null,
    storageKey: '@flights',
    items: []
};

export default function flights(state = initialState, action) {
    switch (action.type) {
        case 'READ_FLIGHTS_START':
            return {
                ...state,
                ...{ pending: true }
            };
        case 'READ_FLIGHTS_COMPLETE':
            return {
                ...state, ...{
                    pending: false,
                    items: action.payload.items
                }
            };
        case 'FETCH_FLIGHTS_START':
            return {
                ...state,
                ...{ pending: true }
            };
        case 'FETCH_FLIGHTS_COMPLETE':
            return {
                ...state, ...{
                    pending: false,
                    items: action.payload.items
                }
            };
        default:
            return state;
    }
}
