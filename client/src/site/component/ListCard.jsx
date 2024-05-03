import React, { useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import axios from 'axios'
import { useDataContext } from '../../context/DataContext'
import SkeletonProduct from './SkeletonProduct'

const ListCard = () => {
  const [loading, setLoading] = useState(true)
  const Data = useDataContext()

  useEffect(function(){
    Data.getData('/api/product')
    .then(async (result) => {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setLoading(false)
    })
    .catch(()=>setLoading(true))
  },[])

  return (
    <div className=' w-full px-20 mx-auto mt-10'>
        <div className='grid lg:grid-cols-4 gap-10 md:grid-cols-3 grid-cols-1 justify-items-center'>
        {Data.data && Data.data.map(function(value, index){
          return(loading ? <SkeletonProduct></SkeletonProduct> : <ProductCard key={value.id_prd} product={value} />)
        })}
        </div>
    </div>
  )
}

export default ListCard