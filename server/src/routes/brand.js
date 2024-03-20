var express = require('express')
const router = express.Router()
const BrandController = require('../app/controllers/BrandController')
const ImageResource = require('../app/controllers/ImageResourceController')

// Create a new Brand
router.post("/", ImageResource.uploadBrandLogo.single('logo_brand'), BrandController.create);

// Retrieve all Brands
router.get("/", BrandController.findAll);

// Retrieve a single Brand with id
router.get("/:id", BrandController.findOne);

// Update a Brand with id
router.put("/:id", ImageResource.uploadBrandLogo.single('logo_brand'), BrandController.update);

// Delete a Brand with id
router.delete("/:id", BrandController.delete);

// Delete all Brand
router.delete("/", BrandController.deleteAll);

module.exports = router

