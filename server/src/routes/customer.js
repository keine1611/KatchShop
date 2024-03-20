var express = require('express')
const router = express.Router()
const CustomerController = require('../app/controllers/CustomerController')

// Create a new Customer
router.post("/", CustomerController.create)

// Retrieve all Customers
router.get("/", CustomerController.findAll)

// Retrieve a single Customer with id
router.get("/:id", CustomerController.findOne)

// Update a Customer with id
router.put("/:id", CustomerController.update)

// Delete a Customer with id
router.delete("/:id", CustomerController.delete)

// Delete all Customer
router.delete("/", CustomerController.deleteAll)

module.exports = router

