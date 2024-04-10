import axios from "axios"

const url = '/api/comments'

export const getCommentProduct = (id)=>axios.get(url+'/product/'+id+'/comments')
export const saveComment = (comment)=>axios.post(url)
