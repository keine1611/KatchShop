var express = require('express')
const router = express.Router()
const ImageController = require('../app/controllers/ImageController')

// Create a new Image
router.post("/", ImageController.create)

// Retrieve all Images
router.get("/", ImageController.findAll)

// Retrieve a single Image with id
router.get("/:id", ImageController.findOne)

// Update a Image with id
router.put("/:id", ImageController.update)

// Delete a Image with id
router.delete("/:id", ImageController.delete)

// Delete all Image
router.delete("/", ImageController.deleteAll)

module.exports = router

