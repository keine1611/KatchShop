var express = require('express')
const router = express.Router()
const StaffController = require('../app/controllers/StaffController')

// Create a new Staff
router.post("/", StaffController.create)

// Retrieve all Staffs
router.get("/", StaffController.findAll)

// Retrieve a single Staff with id
router.get("/:id", StaffController.findOne)

// Update a Staff with id
router.put("/:id", StaffController.update)

// Delete a Staff with id
router.delete("/:id", StaffController.delete)

// Delete all Staff
router.delete("/", StaffController.deleteAll)

module.exports = router

