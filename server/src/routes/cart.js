var express = require('express')
const router = express.Router()
const CartController = require('../app/controllers/CartController')

// Create a new Account

// Create a new Brand
router.post("/", CartController.create);

// Retrieve all Brands
router.get("/", CartController.findAll);

// Retrieve a single Brand with id
router.get("/:id", CartController.findOne);

// Update a Brand with id
router.put("/:id", CartController.update);

// Delete a Brand with id
router.post('/update/:id',CartController.updateCart)

router.delete("/:id", CartController.delete);

// Delete all Brand
router.delete("/", CartController.deleteAll);


module.exports = router

