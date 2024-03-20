import React from 'react'
import { useAuth } from './AuthContext'
import { Navigate } from 'react-router-dom'



const RoleSecurity = ({ role, children }) => {
    const auth = useAuth()
    if(auth.user.user.role_acc === role){
        return(children)
    }
    return <Navigate to={'/page404'}/>
}

export default RoleSecurity