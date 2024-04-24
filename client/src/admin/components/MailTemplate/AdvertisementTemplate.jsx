import React from 'react'
import { Link } from 'react-router-dom'

import api from '../../../api'

const AdvertisementTemplate = ({watchesSelected}) => {
  return (
    <div className=' bg-white w-full'>
      <div className='mx-auto max-w-2xl my-10'>
        <h1 className=' font-Pacifico font-extrabold text-2xl'>KATCH SHOP</h1>
        <div>
          <img className=' w-40 h-40 mx-auto' src={process.env.PUBLIC_URL + '/logo_katchshop.png'} />
        </div>
        <div className=''>
          <h1 className=' font-Pacifico font-extrabold text-2xl text-center py-2 border-b border-gray-700 w-fit mx-auto'>Top Offers</h1>
          <div className=' flex flex-row flex-wrap gap-2'>
            {watchesSelected.map(watch => {
              return (
                <div key={watch.id_prd} className="card w-52 bg-base-100 shadow-xl">
                  <figure className="px-10 pt-10">
                    <img src={api.imageApi.watch + watch.main_img_prd} alt="Watch" className="rounded-xl" />
                  </figure>
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">{watch.name_prd}</h2>
                    <p className=' line-clamp-3'>{watch.description_prd}</p>
                    <div className="card-actions">
                      <button className="btn bg-greyButton hover:bg-blue-gray-500">Buy Now</button>
                    </div>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
        <div className='border-2 rounded-md border-gray-500 px-10 py-5 mt-5'>
          <h1 className=' font-Pacifico font-extrabold text-2xl text-center py-2 w-fit mx-auto'>The Katch Shop Discounts</h1>
          <p className=' text-[#f7a34e] font-Pacifico text-center'>Every last friday of the month</p>
          <p className=' mt-10 font-Pacifico text-lg'>
            We’re offering a special 30% discount on your next purchase with code SAVE30.
            Start shopping now: <a href='#'></a>
          </p>
        </div>
        <div className=' mt-10'>
          <div className=' flex flex-col items-center gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#404040" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="10" r="3" /><path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" /></svg>
            <p className=' font-Pacifico text-2xl'>Where to find us</p>

          </div>
          <p className=' text-lg font-Pacifico text-center'>Xuan Khanh-Ninh Kieu-Can Tho</p>
          <img className=' mx-auto mt-5 rounded-xl border border-gray-400' src={process.env.PUBLIC_URL + '/image/map.png'} />
        </div>
        <div className=' mt-10'>
          <div className=" flex flex-row items-center justify-around">
            <a><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
            <a><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg></a>
          </div>
          <p className=' text-center mt-5 font-Pacifico'>083 642 0652</p>
        </div>

      </div>

    </div>
  )
}

export default AdvertisementTemplate