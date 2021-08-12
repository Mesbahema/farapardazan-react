import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'



export const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const initialState = {
        order: 'asc',
        orderBy: 'id',
        selected: [],
        page: 1,
        rowsPerPage: 5,
        filterBy: '',
        filter: '',
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    const { cart } = state

    // useEffect(() => {
    //     const __next__cart01__accessory_ecommerce = JSON.parse(localStorage.getItem(process.env.CART))
        
    //     if(__next__cart01__accessory_ecommerce) dispatch({type: 'ADD_CART', payload: __next__cart01__accessory_ecommerce})
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem(process.env.CART, JSON.stringify(cart))
    // }, [cart])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}