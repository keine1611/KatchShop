    import React from 'react'

    const RatingStartChoose = ({ starNum, setStarNum }) => {

        const handleStarClick = (numStar) => {
            setStarNum(numStar);
        };

        return (
            <div className="rating">
                {[1,2,3,4,5].map(index=>{{
                    return(
                        <input key={index} onChange={()=>handleStarClick(index)} type="radio" name="rating-2" className="mask mask-star-2 bg-[#ffe234]" checked={index === starNum} />
                    )
                }})}                
            </div>
        );
    }

    export default RatingStartChoose