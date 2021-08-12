import { createContext, useReducer, useEffect } from 'react'
import reducers from './Reducers'

import { setUrlParams, getUrlParams } from '../utils/urlParams'



export const DataContext = createContext()

const selected_title = 'farapardazan_mesbah_emami_project_selected'


export const DataProvider = ({ children }) => {
    const initialState = {
        order: 'asc',
        orderBy: 'id',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        filterBy: null,
        filter: '',
    }

    const [state, dispatch] = useReducer(reducers, initialState)

    const { order, orderBy, page, rowsPerPage, filterBy, filter, selected } = state

    useEffect(() => {
        const params = getUrlParams(initialState)
        const selectedItems = localStorage.getItem(selected_title)
        dispatch({
            type: 'SET_INITIAL_STATE', payload: params
        })

        if (selectedItems)
            dispatch({
                type: 'SET_SELECTED', payload: JSON.parse(selectedItems)
            })
    }, [])

    const stateObject = { order, orderBy, page, rowsPerPage, filterBy, filter }
    useEffect(() => {
        setUrlParams(stateObject)
    }, [order, orderBy, page, rowsPerPage, filterBy, filter])

    useEffect(() => {
        localStorage.setItem(selected_title, JSON.stringify(selected))
    }, [selected])

    return (
        <DataContext.Provider value={{ state, dispatch }}>
            {children}
        </DataContext.Provider>
    )
}