import React, { useContext, useEffect, useState, useRef, useCallback } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useCartContext } from './CartContext'


const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => {
    const cart = useCartContext()
    const {cartItems, setCartItems} = cart

    const getCurrentUser = () => (JSON.parse(localStorage.getItem('user')))

    const  findCurrentUser = ()=>{
        if (getCurrentUser() !== null) {
            return {
                auth: true,
                user: getCurrentUser()
            }
        }
        else {
            return{
                auth: false,
                user: {}
            }
        }
    }
    const [user, setUser] = useState(findCurrentUser())
    const login = async (data) => new Promise((resolve, reject) =>{ 
        axios.post('/api/auth/login', data)
        .then( async (res) => {
            localStorage.setItem('user',res.data)
            setUser({auth: true, user: JSON.parse(res.data)})
            const data = JSON.parse(res.data)
            if(data.role_acc == 'customer')
             axios.get('/api/cart/'+data.customer.id_cus)
            .then((result) => {
                setCartItems(result.data)
                localStorage.setItem('cart', JSON.stringify(result.data))
                resolve()
            }).catch((err) => {
                reject()
            });
            resolve()
           
        })  
        .catch(()=> reject())
    })

    const register = (data) => axios.post('/api/auth/register', data)
        .then(function (res) {
            console.log(res.data)
            localStorage.setItem('user', JSON.stringify(res.data))
            setUser(getCurrentUser())
        })

    const logOut = async () => {
        localStorage.removeItem('user')
        localStorage.removeItem('cart')
        if(user.auth && user.user.role_acc === 'customer'){
            axios.post('/api/cart/update/'+user.user.customer.id_cus, cartItems)
            .then((result) => {
                setUser({
                    auth: false,
                    user: {}
                })
                setCartItems([])
            })
        }
        else{
            setUser({
                auth: false,
                user: {}
            })
            setCartItems([])
        }
    }
    return (
        <AuthContext.Provider value={{ user, setUser, getCurrentUser, login, logOut,register}}>{children}</AuthContext.Provider>
    )
}


export const useAuth = () => {
    return useContext(AuthContext)
}

