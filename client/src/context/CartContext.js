import React, { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext()


const CartProvider = ({ children }) => {

    const [cartItems, setCartItems] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
    const [cartQuality, setCartQuality] = useState(0)



    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems))
    }, [cartItems])


    useEffect(() => {
        setCartQuality(getQuantityCart())
    }, [cartItems])

    function addToCart(product) {
        const isProductInCart = cartItems.find((cartItem) => cartItem.product.id_prd === product.id_prd)
        if (isProductInCart) {
            setCartItems(cartItems.map((cartItem) =>
                cartItem.product.id_prd === product.id_prd
                    ? { ...cartItem, quantity_cart: cartItem.quantity_cart + 1 } : cartItem))

        }
        else {
            setCartItems([...cartItems, { quantity_cart: 1, product: product }])
        }

    }

    function removeFromCart(product) {
        const isProductInCart = cartItems.find((cartItem) => cartItem.product.id_prd === product.id_prd)
        if (isProductInCart.quantity_cart === 1) {
            setCartItems(cartItems.filter((cartItem) => cartItem.product.id_prd !== product.id_prd))
        }
        else {
            setCartItems(cartItems.map((cartItem) =>
                cartItem.product.id_prd === product.id_prd ? { ...cartItem, quantity_cart: cartItem.quantity_cart - 1 } : cartItem))
        }
    }

    function clearCartItem() {
        setCartItems([])
    }

    function removeProductFromCart(product) {
        setCartItems(cartItems.filter((cartItem) => cartItem.product.id_prd !== product.id_prd))
    }
    
    function getCartTotal() {
        return cartItems.reduce((total, item) =>
            total + item.product.price_prd * item.quantity_cart
            , 0)
    }

    function getQuantityCart() {
        return cartItems.length
    }

    return (
        <CartContext.Provider value={{ cartItems,removeProductFromCart, cartQuality, addToCart, removeFromCart, getCartTotal, setCartItems }}>{children}</CartContext.Provider>
    )
}

export const useCartContext = () => { return useContext(CartContext) }

export default CartProvider