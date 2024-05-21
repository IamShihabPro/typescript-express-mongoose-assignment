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
exports.orderController = void 0;
const order_service_1 = require("./order.service");
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const product_model_1 = require("../products/product.model");
// create order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodParsedData = order_zod_validation_1.default.parse(orderData);
        const product = yield product_model_1.Product.findById(zodParsedData.productId);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        if (product.inventory.quantity < zodParsedData.quantity) {
            return res.status(400).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        // Reduce quantity by the order quantity
        product.inventory.quantity -= zodParsedData.quantity;
        // If quantity becomes 0, set inStock to false
        if (product.inventory.quantity === 0) {
            product.inventory.inStock = false;
        }
        // Save the updated product
        yield product.save();
        const result = yield order_service_1.OrderService.createOrderDB(zodParsedData);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Order cannot be created",
            });
        }
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while creating the order.",
        });
    }
});
// get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_service_1.OrderService.getAllOrdersDB();
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
// Get orders by email
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email parameter is missing in the request.",
            });
        }
        const result = yield order_service_1.OrderService.getOrdersByEmailDB(email);
        if (!result || result.length === 0) {
            return res.status(404).json({
                success: false,
                message: `No orders found for email ${email}.`,
            });
        }
        res.status(200).json({
            success: true,
            message: "Orders fetched successfully for email!",
            data: result,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the orders.",
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrders,
    getOrdersByEmail
};
