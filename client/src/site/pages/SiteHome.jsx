import React, { useEffect, useState } from 'react'
import { SlideShow } from '../component/SlideShow'
import PreLoading  from '../component/PreLoading'


const SiteHome = () => {

    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        document.title = 'Home'
    },[])

    useEffect(()=>{
        const fn = async ()=>{
            await new Promise((resolve)=> setTimeout(resolve, 2000))
            setLoading(false)
        }
        fn()
    },[])



    return (
        <>
        {loading ? <PreLoading></PreLoading> :
            <div className=' w-full mt-[240px]'>
                <SlideShow />
                <div className='w-full bg-black text-white h-max'>
                    <div className='flex md:flex-row flex-col'>
                        <div className='p-10 my-auto space-y-3'>
                            <h1 className='text-4xl font-Pacifico'>We offer precious watch</h1>
                            <span className='block'>A stylish person must definitely have a watch.We will definitely satisfy you</span>
                            <button className='px-4 py-2 bg-blue-gray-300 border-solid border-2 border-black hover:bg-blue-gray-600 transition'>Discover</button>
                        </div>
                        <img className='p-10 md:m-0 object-cover md:w-2/3 w-full  ml-auto transition ease-in-out delay-15 duration-300 hover:translate-y-1 hover:-translate-x-1.5' src={process.env.PUBLIC_URL + '/image/page/rolex-daytona-wrist.jpg'} />
                    </div>
                    <div className='bg-white text-black p-10 flex flex-row gap-10'>
                        <img className=' w-96 h-96 rounded-full transition ease-in-out delay-15 duration-300 hover:translate-y-1 hover:translate-x-1.5' src={process.env.PUBLIC_URL + '/image/page/keep-exploring-new-2023-watches.jpg.jpg'} />
                        <div className='p-10 my-auto space-y-3 flex-1'>
                            <h1 className='text-4xl font-Pacifico'>Luxury watch</h1>
                            <span className='block'>Luxurious, elegant, noble design. Contact us to own exclusive watches</span>
                            <button className='px-4 py-2 bg-blue-gray-300 border-solid border-2 border-black hover:bg-blue-gray-600 transition'>Discover</button>
                        </div>
                    </div>
                </div>
            </div>
        }

        </>

    )
}

export default SiteHome