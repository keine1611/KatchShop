var express = require('express')
const router = express.Router()
const Auth = require('../app/controllers/AuthController')

// Create a new Account
router.post("/register", Auth.register )

// Retrieve all Accounts
router.post("/login", Auth.login)

router.post("/logout", Auth.logout)

router.post

module.exports = router

