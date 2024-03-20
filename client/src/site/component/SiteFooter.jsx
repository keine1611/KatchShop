import React from 'react'
import LocationOnRoundedIcon from '@mui/icons-material/LocationOnRounded';
import CallRoundedIcon from '@mui/icons-material/CallRounded';
import { Icon } from '@mui/material';

const SiteFooter = () => {
  return (
    <>
      <div className='h-80 w-full rounded-md'>
        <div className='flex md:flex-row flex-wrap mx-auto gap-2 justify-around px-4 py-8'>
          <div className='container w-60 mx-auto md:mx-0'>
            <span className='font-bold'>Policy</span>
            <div className='h-1 w-1/3 bg-blue-gray-600'> </div>
            <ul className='mt-4 [&>li]:mt-2 [&>li]:ml-5 list-disc '>
              <li>Delivery policy</li>
              <li>Exchange policy</li>
              <li>Payment policy</li>
              <li>Warranty Policy</li>
              <li>Installment purchase</li>
            </ul>
          </div>
          <div className='container w-60 mx-auto md:mx-0'>
            <span className='font-bold'>Shop system</span>
            <div className='h-1 w-1/3 bg-blue-gray-600'> </div>
            <ul className='mt-4 [&>li]:mt-2 [&>li]:ml-2 '>
              <li><LocationOnRoundedIcon fontSize='small' />  Ninh Kieu Quay, Can Tho City</li>
            </ul>
          </div>
          <div className='container w-60 mx-auto md:mx-0'>
            <span className='font-bold'>Contact info</span>
            <div className='h-1 w-1/3 bg-blue-gray-600'> </div>
            <ul className='mt-4 [&>li]:mt-2 [&>li]:ml-2 '>
              <li><CallRoundedIcon fontSize='small'/>  Please call: 0811.2312.312</li>
              <li><CallRoundedIcon fontSize='small'/>  Hotline: 0991.231.122</li>
            </ul>
          </div>
          <div className='container w-60 mx-auto md:mx-0'>
            <span className='font-bold'>Social app</span>
            <div className='h-1 w-1/3 bg-blue-gray-600'> </div>
            <div className='mt-4 flex flex-row items-center  justify-between  gap-4'>
              <img className='h-7 w-7 hover: cursor-pointer' src={process.env.PUBLIC_URL + '/icon/facebook.png'}/>
              <img className='h-7 w-7 hover: cursor-pointer' src={process.env.PUBLIC_URL + '/icon/instagram.png'}/>
              <img className='h-7 w-7 hover: cursor-pointer' src={process.env.PUBLIC_URL + '/icon/twitter.png'}/>
              <img className='h-7 w-7 hover: cursor-pointer' src={process.env.PUBLIC_URL + '/icon/tik-tok.png'}/>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default SiteFooter