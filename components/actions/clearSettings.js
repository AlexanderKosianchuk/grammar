export default function clearSettings (payload) {
    return function(dispatch) {
        dispatch({
            type: 'CLEAR_SETTINGS'
        });
    }
};
