import { io } from "socket.io-client"

const URL = 'http://localhost:1611'

export const socket = io(URL, {autoConnect: false})
