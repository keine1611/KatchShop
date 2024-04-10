var express = require('express')
const router = express.Router()
const CommentController = require('../app/controllers/CommentController')

// Create a new Comment
router.post("/", CommentController.create)

// Retrieve all Comments
router.get("/", CommentController.findAll)

//Retrieve all comments of product
router.get('/product/:id/comments', CommentController.getProductComment)

// Retrieve a single Comment with id
// router.get("/:id", CommentController.findOne)

// // Update a Comment with id
// router.put("/:id", CommentController.update)

// // Delete a Comment with id
// router.delete("/:id", CommentController.delete)

// // Delete all Comment
// router.delete("/", CommentController.deleteAll)

module.exports = router

