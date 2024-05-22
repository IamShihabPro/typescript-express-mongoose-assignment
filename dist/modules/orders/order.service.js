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
exports.OrderService = void 0;
const order_model_1 = require("./order.model");
const createOrderDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.Order.create(order);
    return result;
});
const getAllOrdersDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    if (email) {
        const result = yield order_model_1.Order.aggregate([
            {
                $match: { email: email },
            },
            {
                $project: {
                    __v: 0,
                },
            },
        ]);
        return result;
    }
    else {
        return yield order_model_1.Order.find();
    }
});
exports.OrderService = {
    createOrderDB,
    getAllOrdersDB,
};
