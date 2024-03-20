var express = require('express')
const router = express.Router()
const AccountController = require('../app/controllers/AccountController')

// Create a new Account
router.post("/", AccountController.create);

// Retrieve all Accounts
router.get("/", AccountController.findAll);

// Retrieve a single Account with id
router.get("/:id", AccountController.findOne);

// Update a Account with id
router.put("/:id", AccountController.update);

// Delete a Account with id
router.delete("/:id", AccountController.delete);

// Delete all Account
router.delete("/", AccountController.deleteAll);

module.exports = router

