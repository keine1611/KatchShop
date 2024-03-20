import React from 'react'
import { NavLink } from 'react-router-dom'

const NavItem = ({title, link}) => {
    return <NavLink className='p-2 h-fit transition ease-in-out delay-15 hover:-translate-y-1 hover:scale-110 hover:bg-blue-gray-200 duration-3000 rounded-md text-center flex-1' to={link}>{title}</NavLink>
}

export default NavItem