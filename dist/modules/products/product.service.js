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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const product_model_1 = require("./product.model");
const createProductDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getAllProductsDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProductDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ _id });
    return result;
});
const updateSingleProductDB = (_id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate(_id, updateData, { new: true });
    return result;
});
const searchProductsDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchRegex = new RegExp(searchTerm, 'i');
    const products = yield product_model_1.Product.aggregate([
        {
            $match: {
                $or: [
                    { name: searchRegex },
                    { description: searchRegex },
                    { category: searchRegex },
                    { tags: { $in: [searchRegex] } }
                ]
            }
        }
    ]);
    return products;
});
const deleteProductDB = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id });
    return result;
});
exports.ProductService = {
    createProductDB,
    getAllProductsDB,
    getSingleProductDB,
    updateSingleProductDB,
    searchProductsDB,
    deleteProductDB,
};
