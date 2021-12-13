const { Router } = require('express')
const productController = require('../../controllers/products/products.controller')

const router = Router()

router.post('/addProduct/vape', productController.addVapeProduct)
router.post('/addProduct/vape/addphoto', productController.addPhotoVape)

// router.post('/avatar',)

module.exports = router