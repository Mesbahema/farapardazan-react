export const ACTIONS = {
    NOTIFY: 'NOTIFY',
    AUTH: 'AUTH',
    ADD_CART: 'ADD_CART',
    REMOVE_CART: 'REMOVE_CART',
    DETECT: 'DETECT',
    LOADING: 'LOADING',
    DONE: 'DONE',
    SET_TITLE: 'SET_TITLE',
    SET_MODEL: 'SET_MODEL',
    RESET_CART: 'RESET_CART',
    ADD_CART_AND_NOTIFY: 'ADD_CART_AND_NOTIFY',
}

export const addToCart = (product, cart) => {
    if(product.inStock === 0) return ({type: 'NOTIFY', payload: {error: '.این محصوول وجود ندارد'}})

        const check = cart.every(item => {
            return item._id !== product._id
        })

        if(!check) return ({type: 'NOTIFY', payload: {info: 'این محصول در حال حاضر در سبد خرید شماست.'}})

        return ({type: 'ADD_CART_AND_NOTIFY', payload: {

            cart: [...cart, {...product, quantity: 1}],
            notify: {success: 'با موفقیت به سبد خرید اضافه شد.'}
     }})
}

export const removeFromCart = (product, cart) => {
    
    const newCart = cart.filter(item => item._id !== product._id)
    
    return ({type: 'REMOVE_CART', payload: newCart })
    
}