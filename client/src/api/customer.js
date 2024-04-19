import axios from "axios"

const url = "/api/customer"

export const getAllCustomer = ()=>axios.get(url)