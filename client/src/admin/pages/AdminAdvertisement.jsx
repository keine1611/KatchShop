import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Autocomplete, TextField } from '@mui/material'
import ReactDOMServer from 'react-dom/server';
import emailjs from '@emailjs/browser'
import AdvertisementTemplate from '../../admin/components/MailTemplate/AdvertisementTemplate'
import api from '../../api/index'


const componentToHtmlString = (Component, props) => {
  const element = React.createElement(Component, props);
  const htmlString = ReactDOMServer.renderToString(element);
  return htmlString;
};

const AdminAdvertisement = () => {

  const [watches, setWatches] = useState([])
  const [watchesSelected, setWatchesSelected] = useState([])
  const [drawerState, setDrawerState] = useState(false)
  const [subject, setSubject] = useState('')
  const drawerSideRef = useRef()

  useEffect(() => {
    api.productApi.getProduct()
      .then((result) => {
        setWatches(result.data)
      })
  }, [])


  const handleDeleteWatchSelected = (id) => {
    const arr = watchesSelected.filter(watch => watch.id_prd !== id)
    setWatchesSelected(arr)
  }

  const handleSendMail = async () => {
   
    const content = componentToHtmlString(AdvertisementTemplate,{watchesSelected:watchesSelected});
    const customers = await api.customerApi.getAllCustomer(); 
    customers.data.forEach(async (customer) => {
      try {
        // Send the email
        const response = await emailjs.send('service_sj4dakg', 'template_r6v3et1', {
          message: content,
          to: customer.email_cus,
          subject: subject,
        }, 'yM9CDId3lgPi-yrBZ');

        // Log the response (optional)
        console.log('Email sent to', customer.email_cus, ':', response);
      } catch (error) {
        // Log the error (optional)
        console.error('Error sending email to', customer.email_cus, ':', error);
      }
    });
  };

  return (
    <div className='w-full h-screen mt-6 relative'>
      <div className='flex flex-row items-center justify-around'>
        <div className='flex flex-row flex-1 justify-around'>
          <label className="input input-bordered flex items-center gap-2">
            Subject
            <input type="text" className="grow" placeholder="" value={subject} onChange={(e)=>setSubject(e.target.value)} />
          </label>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={watches}
            sx={{ width: 300 }}
            getOptionLabel={(option) => option.name_prd}
            renderInput={(params) => <TextField {...params} label="Watches" />}
            onChange={(event, newValue) => {
              if (newValue) {
                setWatchesSelected(prev => [...prev, newValue])
              }
            }
            }
          />
        </div>
        <div onClick={() => { setDrawerState(prev => !prev) }} className="indicator hover:cursor-pointer">
          <span className="indicator-item badge badge-secondary bg-blue-gray-300 border-none">{watchesSelected.length}</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
        </div>
      </div>
      <div className=' border border-gray-400 mt-5 h-[500px] overflow-y-auto '>
        <AdvertisementTemplate watchesSelected={watchesSelected} />
      </div>
      <div className=' flex flex-row justify-end'>
        <button onClick={() => handleSendMail()} className='block mt-2 border border-gray-300 bg-greyButton px-1 py-2 rounded-lg font-semibold shadow-lg hover:bg-blue-gray-500 duration-700'>Send Mail</button>
      </div>



      <div className={`${drawerState ? 'absolute' : 'hidden'} top-0 bottom-0 right-0 left-0 h-full min-h-full grid grid-cols-12 border-none transition-all`}>
        <div ref={drawerSideRef} onClick={(e) => { e.preventDefault(); setDrawerState(false) }} className=' blur-sm col-span-8 h-full'> <p> </p></div>
        <div className='bg-base-200 border border-gray-400 shadow-lg rounded-xl px-6 py-10 col-span-4 h-full  '>
          <h1 className='uppercase font-Pacifico text-xl text-center font-semibold'>Watches</h1>
          <div className='mt-4 max-h-[500px] overflow-y-auto'>
            {watchesSelected.map((watch) => (
              <div key={watch.id_prd} className="card w-full bg-base-100 shadow-xl image-full mt-5 max-h-60  ">
                <figure><img src={api.imageApi.watch+ watch.main_img_prd} alt="watch" /></figure>
                <div className="card-body">
                  <h2 className="card-title line-clamp-2">{watch.name_prd}</h2>
                  <p className=' line-clamp-3'>{watch.description_prd.toString()}</p>
                  <div className="card-actions justify-end">
                    <button onClick={() => handleDeleteWatchSelected(watch.id_prd)} className="btn bg-greyButton hover:bg-white">X</button>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </div>

  )
}

export default AdminAdvertisement