var express = require('express')
const router = express.Router()
const Auth = require('../app/controllers/AuthController')
const ImageResource = require('../app/controllers/ImageResourceController')

// Create a new Account
router.post("/register", Auth.register )

// Retrieve all Accounts
router.post("/login", Auth.login)

router.post("/logout", Auth.logout)

router.put("/update_profile/:id", ImageResource.uploadAvatar.single('avatar_acc'), Auth.changeProfile )

router.put("/change_password/:id", Auth.changePassword)

module.exports = router

