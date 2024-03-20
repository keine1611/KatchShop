var express = require('express')
const router = express.Router()
const MessageController = require('../app/controllers/MessageController')

// Create a new Account
router.get('/', MessageController.getHistoryMessages)
router.get('/:id',MessageController.getHistoryMessagesUser)
router.post('/', MessageController.create)
module.exports = router

