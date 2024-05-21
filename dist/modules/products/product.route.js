"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoute = void 0;
const express_1 = __importDefault(require("express"));
// import { Product } from './product.model'
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post('/', product_controller_1.productController.createProduct);
router.get('/', product_controller_1.productController.getAllProducts);
router.get('/:productId', product_controller_1.productController.getSingleProduct);
router.put('/:productId', product_controller_1.productController.updateSingleProduct);
router.get('/', product_controller_1.productController.searchProducts);
router.delete('/:productId', product_controller_1.productController.deleteProduct);
exports.ProductRoute = router;