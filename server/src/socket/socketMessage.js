const { Server } = require('socket.io')
const http = require('http')
const { app } = require('../app')
const { customer, staff } = require('../app/model')
const AccountService = require('../app/services/Account.service')
const MessageService = require('../app/services/Message.service')
const db = require('../config/db')


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
    },

})

// app.use('/findconnect/:id', (req, res)=>{
//     const id = req.params
    
// })


const waitingCustomers = []
const staffSockets = []
const customerSockets = []
const connectionsMap = {}


io.on('connection', (socket) => {
    console.log('A client has connected ' + socket.id)

    socket.on('registerStaff', (id) => {
        const index = staffSockets.findIndex(staffSocket => staffSocket.id == id)
        if (index !== -1) {
            staffSockets[index] = { id, socket: socket }
        }
        else
            staffSockets.push({ id, socket: socket })
        updateRequest()
    })

    socket.on('requestChat', (id) => {
        const waitingCusIndex = waitingCustomers.findIndex(customer => customer.id == id)
        if (waitingCusIndex != -1) {
            return
        }
        else {
            waitingCustomers.push({ id, socket: socket })
            updateRequest()
        }
    })

    socket.on('disconnect', () => {
        console.log('Client disconnect!!!')
        const index = waitingCustomers.findIndex(customer => customer.socket.id === socket.id)
        if (index != -1) {
            waitingCustomers.splice(index, 1)
            updateRequest()
        }

        const customerIndex = customerSockets.findIndex(customer => customer.socket.id === socket.id)
        if (customerIndex != -1) {
            customerSockets.splice(customerIndex, 1)
        }

        const staffIndex = staffSockets.findIndex(staff => staff.socket.id == socket.id)
        if (staffIndex != -1)
            staffSockets.splice(staffIndex, 1)
    })

    socket.on('acceptChatRequest',async customerId => {
        const customerIndex = waitingCustomers.findIndex(customer => customer.id == customerId)
        let staff = staffSockets.find(staff => staff.socket.id == socket.id)
        if (customerIndex !== -1) {
            const customer = waitingCustomers.splice(customerIndex, 1)[0]
            io.to(customer.socket.id).emit('startChat', staff.id)
            connectionsMap[staff.id] = customer.id
            customerSockets.push[{ id: customer.id, socket: customer.socket }]
            const message = await MessageService.saveMessage({
                id_receive: customer.id,
                id_send: staff.id,
                content: "Can I help you??"
            })
            io.to(customer.socket.id).emit('getMessage', message)
            updateRequest()
        }
    })

    socket.on('sendMessage', async (data) => {
        const senderId = data.senderId
        const receiverId = data.receiverId
        const content = data.content
        if (senderId in connectionsMap) {
            const message = await MessageService.saveMessage({ id_send: senderId, id_receive: receiverId, content: content })
            const index = customerSockets.findIndex(customer => customer.id === receiverID)
            if (index !== -1) {
                io.to(customerSockets[index].socket.id).emit('getMessage', message)
            }
        }
        else {
            const message = await MessageService.saveMessage({ id_send: senderId, id_receive: receiverId, content: content })
            const index = (staffSockets.findIndex(staff => staff.id === receiverId))
            if (index !== -1)
                io.to(staffSockets[index].socket.id).emit('getMessage', message)
        }

    })

})

async function updateRequest() {
    const listRequest = await Promise.all(waitingCustomers.map(async (customer) => {
        const customerInfo = await AccountService.findInfoCustomer(customer.id)
        return customerInfo
    }))
    staffSockets.forEach(staffSocket => {
        io.to(staffSocket.socket.id).emit('newChatRequest', listRequest)
    })
}



module.exports = { server }