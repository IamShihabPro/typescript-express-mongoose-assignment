import express, { Request, Response } from 'express'
// import { Product } from './product.model'
import { productController } from './product.controller'

const router = express.Router()

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts )
router.get('/:productId', productController.getSingleProduct)
router.put('/:productId', productController.updateSingleProduct);
router.get('/', productController.searchProducts)

export const ProductRoute = router