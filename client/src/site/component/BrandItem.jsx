import React from 'react'
import { Link } from 'react-router-dom'

const BrandItem = ({src, link}) => {
  return (
    <Link className='h-full w-full' to={'/brand/'+link}>
          <img className='w-2/3 h-2/3 m-auto object-scale-down object-center ' src={process.env.PUBLIC_URL+'/image/brand/'+src} /> 
    </Link>
  )
}

export default BrandItem