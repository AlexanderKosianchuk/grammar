const initialState = {
    pending: null,
    storageKey: '@configs:',
    default: [
        {label: 'QAR IP', key: 'qarIp', value: ''},
        {label: 'QAR login HTTP auth', key: 'qarLoginHttpAuthorizationd', value: ''},
        {label: 'QAR Pass HTTP auth', key: 'qarPassHttpAuth', value: ''},
        {label: 'Server IP', key: 'syncServerIp', value: ''},
        {label: 'Server login', key: 'syncServerLogin', value: ''},
        {label: 'Server pass', key: 'syncServerPass', value: ''},
    ],
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

export default function settings(state = initialState, action) {
    switch (action.type) {
        case 'SETTINGS_SAVED':
            action.payload.items.forEach((payloadItem) => {
                let payloadItemIndex = findItemIndex(state.items, payloadItem.key);
                state.items[payloadItemIndex] = {
                    ...state.items[payloadItemIndex],
                    ...{value: payloadItem.value}
                }
            });

            return {
                ...state,
                ...{items: state.items}
            };
        case 'SETTINGS_GOT':
            return {
                ...state, ...{
                    pending: false,
                    items: action.payload.items
                }
            };
        case 'CLEAR_SETTINGS':
            return {
                ...state, ...{
                    pending: null,
                    items: []
                }
            };
        default:
            return state;
    }
}
