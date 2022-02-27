import { SET_NAME, TOGGLE_ONLINE } from '../actions';

const initialState = {
    player:'',
    online: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case SET_NAME:
            return({
                ...state,
                player: action.payload
            })
        case TOGGLE_ONLINE:
            return({
                ...state,
                online: !state.online
            })
        default:
            return state;
    }
}

export default reducer;
