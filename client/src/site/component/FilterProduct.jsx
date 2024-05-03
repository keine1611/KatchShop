import { useScrollTrigger } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataContext } from '../../context/DataContext'


const arrItemList = [
    {
        title: "Price from low to high",
        value: 'price-asc'
    },
    {
        title: "Price from high to low",
        value: 'price-desc'
    }
]

const FilterProduct = () => {

    const [typeSort, setTypeSort] = useState(arrItemList[0])

    const {data, setData} = useDataContext()

    useEffect(()=>{
        const sortedData = [...data];
        if(typeSort.value === 'price-asc'){
            sortedData.sort((a,b)=> parseInt(a.price_prd) - parseInt(b.price_prd))
        }
        else{
            if(typeSort.value === 'price-desc')
                sortedData.sort((a,b)=> parseInt(b.price_prd) - parseInt(a.price_prd))
        }
        setData(sortedData)
    },[typeSort])

    return (
        <select onChange={(e)=> setTypeSort(JSON.parse(e.target.value))} className="select select-bordered w-full max-w-xs mr-20">
            {
                arrItemList.map((item)=>
                    <option value={JSON.stringify(item)}>{item.title}</option>
                )
            }
        </select>
    )
}

export default FilterProduct