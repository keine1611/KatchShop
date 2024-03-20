import React from 'react'
import { RingLoader } from 'react-spinners'

const PreLoading = ()=> {
  return (
    <div className='w-full mt-[240px] h-[460px]'>
        <RingLoader className='block absolute mx-auto top-1/2 -translate-y-1/2' color="#36d7b7" />
    </div> 
  )
}

export default PreLoading