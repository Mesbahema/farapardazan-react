import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'
import { getData } from 'utils/fetchData'


export const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const initialState = {
        loading: false,
        notify: {}, 
        auth: {},
        cart: [],
        face: [],
        title: '',
        model: {}
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    const { cart } = state

    useEffect(() => {
        const firstLogin = localStorage.getItem('firstlogin')
        if (firstLogin) {
            getData('auth/accessToken').then(res => {
                if (res.err) return localStorage.removeItem('firstlogin')

                dispatch({
                    type: 'AUTH',
                    payload: {
                        token: res.access_token,
                        user: res.user
                    }
                })
            })
        }
    }, [])

    useEffect(() => {
        const __next__cart01__accessory_ecommerce = JSON.parse(localStorage.getItem(process.env.CART))
        
        if(__next__cart01__accessory_ecommerce) dispatch({type: 'ADD_CART', payload: __next__cart01__accessory_ecommerce})
    }, [])

    useEffect(() => {
        localStorage.setItem(process.env.CART, JSON.stringify(cart))
    }, [cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}