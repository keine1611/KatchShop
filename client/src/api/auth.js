import axios from "axios"

const url = '/api/auth'

export const updateProfile = (id_acc, data)=>axios.put(`${url}/update_profile/${id_acc}`,data)

export const changePassword = (id, data) => axios.put(url+`/change_password/${id}`, data)

