import axios from "axios"

const url = '/api/order'

export const getBestSale = (days)=>axios.get(`${url}/get-top-products${days!=='all' ? '?days='+days:''}`)
export const getChartRevenueData = (days)=>axios.get(`${url}/revenue-last-days${days!=='all' ? '?days='+days:''}`)
export const getCommentProduct = (id)=>axios.get(url+'/product/'+id+'/comments')
export const saveComment = (comment)=>axios.post(url,comment)
