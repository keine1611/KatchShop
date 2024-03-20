import React from 'react'
import {useAuth} from '../../../context/AuthContext'



const UserAvatar = () => {
    const {user} = useAuth()
    return (
        <img className='h-10 w-10 rounded-full object-cover' src={process.env.PUBLIC_URL + "/image/avatar/"+ user.user.avatar_acc}></img>
    )
}

export default UserAvatar