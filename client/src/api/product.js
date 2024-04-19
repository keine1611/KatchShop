import axios from "axios"

const url = '/api/product'

export const getProduct = ()=>axios.get(url)