import { ACTIONS } from 'store/Actions'

const reducers = (state, action) => {
    switch(action.type){
        case ACTIONS.NOTIFY:
            return {
                ...state,
                notify: action.payload
            };
        case ACTIONS.AUTH:
            return {
                ...state,
                auth: action.payload
            };
        case ACTIONS.ADD_CART:
            return {
                ...state,
                cart: action.payload
            };
        case ACTIONS.ADD_CART_AND_NOTIFY:
            return {
                ...state,
                cart: action.payload.cart,
                notify: action.payload.notify,
            };
        case ACTIONS.REMOVE_CART:
            return {
                ...state,
                cart: action.payload
            };
        case ACTIONS.DETECT:
            return {
                ...state,
                face: action.payload
            };
        case ACTIONS.LOADING:
            return {
                ...state,
                loading: true
            };
        case ACTIONS.DONE:
            return {
                ...state,
                loading: false
            };
        case ACTIONS.SET_TITLE:
            return {
                ...state,
                title: action.title
            };
        case ACTIONS.SET_MODEL:
            return {
                ...state,
                model: action.payload
            }
        case ACTIONS.RESET_CART:
            localStorage.setItem(process.env.CART, JSON.stringify([]))
            return {
                ...state,
                cart: []
            }
        default:
            return state;

    }
}

export default reducers