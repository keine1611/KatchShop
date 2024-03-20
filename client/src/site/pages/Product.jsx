import React, { useEffect, useState } from 'react'
import ProductComponent from '../component/ProductPage/Product'
import { useLocation, useParams } from 'react-router-dom'
import Breadcrumd from '../component/Breadcrumd'
import PreLoading from '../component/PreLoading'
import { get } from 'react-hook-form'


const Product = () => {
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const {id} = params
  useEffect(()=>{
    document.title = 'Product'
  },[])

  useEffect(()=>{
    setLoading(true)
    const fn = async ()=>{
      await new Promise((resolve)=> setTimeout(resolve, 2000))
      setLoading(false)
    }
    fn()
  },[id])


  
  return (
    <>
      {loading ? <PreLoading/> : 
      <div className='w-full mt-[220px]'>
      <div>
        <Breadcrumd/>
        <ProductComponent idProduct={id}/>
      </div>
    </div>}
    </>
    
  )
}

export default Product