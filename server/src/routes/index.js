const brandRouter = require('./brand')
const productRouter = require('./product')
const imageRouter = require('./image')
const accountRouter = require('./account')
const customerRouter = require('./customer')
const staffRouter = require('./staff')
const newsRouter = require('./news')
const orderRouter = require('./order')
const authRouter = require('./auth')
const cartRouter = require('./cart')
const messageRouter = require('./message')
const ImageResourceRouter = require('./imageResource')
const ConversationRouter = require('./conversation')


function route(app){
    app.use('/api/brand', brandRouter)
    app.use('/api/product', productRouter)
    app.use('/api/image', imageRouter)
    app.use('/api/account', accountRouter)
    app.use('/api/customer', customerRouter)
    app.use('/api/staff', staffRouter)
    // app.use('/news', newsRouter)
    app.use('/api/order', orderRouter)
    app.use('/api/auth', authRouter)
    app.use('/api/cart', cartRouter)
    app.use('/api/message',messageRouter)
    app.use('/api/imageresource', ImageResourceRouter)
    app.use('/api/conversation', ConversationRouter)
}

module.exports = route