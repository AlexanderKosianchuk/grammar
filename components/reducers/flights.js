const initialState = {
    pending: null,
    storageKey: '@flights',
    items: []
};

function findItemIndex(items, searchKey) {
    let itemIndex = null;

    if (items
        && Array.isArray(items)
        && (items.length > 0)
    ) {
        items.forEach((item, index) => {
            if (item.key === searchKey) {
                itemIndex = index;
            }
        });
    }

    return itemIndex;
}

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
        default:
            return state;
    }
}
