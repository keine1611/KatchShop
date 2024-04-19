var express = require('express')
const router = express.Router()
const OrderController = require('../app/controllers/OrderController')

router.get('/revenue-last-days', OrderController.getRevenueLastDays)
router.post('/createorder',OrderController.createOrder)
router.put('/:id', OrderController.update)
router.delete('/:id', OrderController.delete )
router.get('/:id', OrderController.getOrderForCustomer)
router.get('/', OrderController.getAll)



module.exports = router

