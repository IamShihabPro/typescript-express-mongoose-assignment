"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_service_1 = require("./product.service");
const product_zod_validation_1 = __importDefault(require("./product.zod.validation"));
// create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        const zodParsedData = product_zod_validation_1.default.parse(productData);
        const result = yield product_service_1.ProductService.createProductDB(zodParsedData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product cannot created",
            });
        }
        res.status(200).json({
            "success": true,
            "message": "Product created successfully!",
            data: result
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while create the product.",
        });
    }
});
// get all product
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield product_service_1.ProductService.getAllProductsDB();
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Products not found",
            });
        }
        res.status(200).json({
            success: true,
            message: 'Product are retrived successfully',
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrived the product.",
        });
    }
});
//   get single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.getSingleProductDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product are fetched successfully !",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product.",
        });
    }
});
// Update single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = yield product_service_1.ProductService.updateSingleProductDB(productId, updateData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
        });
    }
});
// search query
const searchProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const products = yield product_service_1.ProductService.searchProductsDB(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products.",
        });
    }
});
// delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.ProductService.deleteProductDB(productId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: null,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product.",
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    searchProducts,
    deleteProduct,
};
