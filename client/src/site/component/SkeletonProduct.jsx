import React from 'react'
import Skeleton from '@mui/material/Skeleton';


const SkeletonProduct = () => {
    return (
        <div className='w-full h-full rounded-xl p-4 bg-white bg-clip-border'>
            {/* For variant="text", adjust the height via font-size */}
            <Skeleton className='rounded-xl w-full' variant="rectangular" height={208} />
            <div className="py-6">
                <div className="mb-2 flex gap-2 items-start justify-between">
                    <div className=" flex-1 font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        <Skeleton variant="text" className='w-full' />
                    </div>
                    <div className="block flex-1 text-right font-sans text-base font-medium leading-relaxed text-blue-gray-900 antialiased">
                        <Skeleton variant="text" className='w-full' />
                    </div>
                </div>
                <div className='h-12 w-full rounded-lg'>
                    <Skeleton variant="rectangular" height={48} />
                </div>
            </div>
            <div className="pt-0 mt-auto">
                <Skeleton variant="rectangular" className=' rounded-lg mx-auto' width={100} height={35} />
            </div>
        </div>
    );
}

export default SkeletonProduct