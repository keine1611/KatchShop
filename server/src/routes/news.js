var express = require('express')
const router = express.Router()
const NewsController = require('../app/controllers/NewsController')

// Create a new News
router.post("/", NewsController.create)

// Retrieve all Newss
router.get("/", NewsController.findAll)

// Retrieve a single News with id
router.get("/:id", NewsController.findOne)

// Update a News with id
router.put("/:id", NewsController.update)

// Delete a News with id
router.delete("/:id", NewsController.delete)

// Delete all News
router.delete("/", NewsController.deleteAll)

module.exports = router

