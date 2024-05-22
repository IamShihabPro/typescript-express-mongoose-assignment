import express from 'express'
import { productController } from './product.controller'

const router = express.Router()

router.post('/', productController.createProduct)
router.get('/', productController.getAllProducts )
router.get('/:productId', productController.getSingleProduct)
router.put('/:productId', productController.updateSingleProduct);
router.get('/', productController.searchProducts)
router.delete('/:productId', productController.deleteProduct)

export const ProductRoute = router;
