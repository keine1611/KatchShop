import React, { useEffect } from 'react'
import ListCard from '../component/ListCard'
import Breadcrumd from '../component/Breadcrumd'
import FilterProduct from '../component/FilterProduct'
const ProductList = () => {
  useEffect(() => {
    document.title = 'Product'
  }, [])
  return (
    <div className='w-full mt-[220px]'>
      <div className=' w-full flex flex-row justify-between items-center'>
        <Breadcrumd></Breadcrumd>
        <FilterProduct></FilterProduct>
      </div>

      <ListCard />
    </div>

  )
}

export default ProductList