import React from 'react'

const RatingStar = ({ starNum }) => {
   
    return (
        <div className="rating mb-5 rating-sm">
           {[1,2,3,4,5].map(index=>{
                    return(
                        <input key={index} onChange={(e)=>e.preventDefault()} type="radio" className="mask mask-star-2 bg-[#ffe234]" checked={index === (starNum)} />
                    )
            })}  
        </div>
    )
}

export default RatingStar