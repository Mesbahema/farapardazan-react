import { ACTIONS } from './Actions'

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.SET_ORDER:
            return {
                ...state,
                // notify: action.payload
            };
        case ACTIONS.SET_ORDER_BY:
            return {
                ...state,
                // notify: action.payload
            };
        case ACTIONS.SET_FILTER_BY:
            return {
                ...state,
                filterBy: action.payload
            };
        case ACTIONS.SET_FILTER:
            return {
                ...state,
                filter: action.payload
            };
    
        default:
            return state;

    }
}

export default reducers