import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { set } from 'react-hook-form'


const DataContext = createContext()

const DataProvider = ({children}) => {
    const [data, setData] = useState([])
    const [searchParams, setSearchParams] = useState([])

    async function getData(url){
        axios.get(url)
        .then((res) =>setData(res.data))
        .catch((res)=>setData([]))
    }

    useEffect(function(){
      setSearchParams(data)
    },[data])

  return (
   <DataContext.Provider value={{data, setData, getData, searchParams, setSearchParams}}>{children}</DataContext.Provider>
  )
}

export const useDataContext = ()=> useContext(DataContext)

export default DataProvider