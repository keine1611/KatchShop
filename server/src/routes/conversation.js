var express = require('express')
const router = express.Router()
const ConversationController = require('../app/controllers/ConversationController')
const { conversation } = require('../app/model')

router.get('/admin/:id', ConversationController.findConversationForAdmin)
router.get('/admin', ConversationController.getConversationForAdmin)
router.get('/:id', ConversationController.findOne)

module.exports = router

