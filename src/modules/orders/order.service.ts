import { TOrder } from "./order.interface"
import { Order } from "./order.model"

const createOrderDB = async (order: TOrder) =>{
    const result = await Order.create(order)
    return result
}

const getAllOrdersDB = async () => {
    const result = await Order.find()
    return result
}

// const getOrdersByEmailDB = async (email: string) => {
//     const result = await Order.find({email: email })
//     return result;
// };
const getOrdersByEmailDB = async (email: string) => {
    const searchRegex = new RegExp(email, 'i');
    const order = await Order.aggregate([
        {
            $match: {email: searchRegex}
        }
    ]);
    return order;
};

export const OrderService ={
    createOrderDB,
    getAllOrdersDB,
    getOrdersByEmailDB,
}
