var express = require('express')
const router = express.Router()
const ProductController = require('../app/controllers/ProductController')

// Create a new Product
router.post("/", ProductController.create);

// Retrieve all Products
router.get("/", ProductController.findAll);

// Retrieve a single Product with id
router.get("/:id", ProductController.findOne);

// Update a Product with id
router.put("/:id", ProductController.update);

// Delete a Product with id
router.delete("/:id", ProductController.delete);

// Delete all Product
router.delete("/", ProductController.deleteAll);

module.exports = router

