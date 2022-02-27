import { SET_NAME } from '../actions';

const initialState = {
    name:'',
    online: false
}

const reducer = (state=initialState, action) => {
    switch(action.type) {
        case SET_NAME:
            return({
                ...state,
                name: action.payload
            })
        default:
            return state
    }
}

export default reducer;
