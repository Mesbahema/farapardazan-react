import { ACTIONS } from './Actions'

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.SET_ORDER:
            return {
                ...state,
                order: action.payload
            };
        case ACTIONS.SET_ORDER_BY:
            return {
                ...state,
                orderBy: action.payload
            };
        case ACTIONS.SET_SELECTED:
            return {
                ...state,
                selected: action.payload
            };
        case ACTIONS.SET_PAGE:
            return {
                ...state,
                page: action.payload
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
        case ACTIONS.SET_ROWS_PER_PAGE:
            return {
                ...state,
                rowsPerPage: action.payload
            };
    
        default:
            return state;

    }
}

export default reducers