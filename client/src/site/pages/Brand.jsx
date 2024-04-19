import React, { useEffect, useState } from 'react'
import axios from 'axios'

import BrandItem from '../component/BrandItem'
import Breadcrumd from '../component/Breadcrumd'
import PreLoading from '../component/PreLoading'
import ConfirmOrder from '../../admin/components/MailTemplate/ConfirmOrder'

const Brand = () => {
  const [arrBrand, setArrBrand] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    document.title = 'Brand'
  }, [])

  const getBrand = () => {
    axios.get('/api/brand')
      .then(async (res) => {
        await new Promise(resolve => setTimeout(resolve, 2000))
        setArrBrand(res.data)
        setLoading(false)
      })
      .catch((err) => err)
  }

  useEffect(function () {
    getBrand()
  }, [])

  return (

    <>

      <div className='w-full mt-[220px]'>
        {loading ? <PreLoading></PreLoading> :
          <div>
            <Breadcrumd />
            <div className=' mt-10 grid lg:grid-cols-6 gap-4 md:grid-cols-4 grid-cols-3 w-3/4 flex-wrap  mx-auto '>
              {arrBrand && arrBrand.map(function (value, index) {
                return <BrandItem className='border-solid border-2 border-e-gray-500' key={value.id_brand} src={value.logo_brand} link={value.name_brand} />
              })}
            </div>
          </div>
          
        }

      
      </div>
    </>
  )
}

export default Brand