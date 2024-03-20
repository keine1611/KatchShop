import React,{useEffect} from 'react'
import ListCard from '../component/ListCard'
import Breadcrumd from '../component/Breadcrumd'
const ProductList = () => {
  useEffect(()=>{
    document.title = 'Product'
},[])
  return (
    <div className='w-full mt-[220px]'>
      <Breadcrumd></Breadcrumd>
       <ListCard />
    </div>
   
  )
}

export default ProductList