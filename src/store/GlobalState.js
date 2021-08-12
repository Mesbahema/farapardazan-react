import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'

import { setUrlParams, getUrlParams } from '../utils/urlParams'



export const DataContext = createContext()


export const DataProvider = ({ children }) => {
    const initialState = {
        order: 'asc',
        orderBy: 'id',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        filterBy: null,
        filter: null,
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    const {order,orderBy, page, rowsPerPage, filterBy, filter} = state

    // useEffect(() => {
    //     const __next__cart01__accessory_ecommerce = JSON.parse(localStorage.getItem(process.env.CART))
        
    //     if(__next__cart01__accessory_ecommerce) dispatch({type: 'ADD_CART', payload: __next__cart01__accessory_ecommerce})
    // }, [])

    // useEffect(() => {
    //     localStorage.setItem(process.env.CART, JSON.stringify(cart))
    // }, [cart])
    useEffect(() => {
        const params = getUrlParams(initialState)
        console.log(params)
        dispatch({
            type: 'SET_INITIAL_STATE', payload: params
          })
    }, [])

    const stateObject = {order,orderBy, page, rowsPerPage, filterBy, filter}
    useEffect(() => {
        setUrlParams(stateObject)
    }, [order,orderBy, page, rowsPerPage, filterBy, filter])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}