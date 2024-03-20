const express = require('express')
const morgan = require('morgan')
const path = require('path')
const app = express()
const port = 1611
const route = require('./routes')
const cookieParser = require('cookie-parser')
const connection = require("./config/db/index")
const {server} = require('./socket/socketMessage')

//Use urlencoded & json
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(cookieParser())

//Public
app.use(express.static(path.join(__dirname, 'public')))

//HTTP Logger
// app.use(morgan('combined'))

//Router
route(app)

//socket io chat
server.listen(8080)
app.listen(port)

module.exports = {app}

