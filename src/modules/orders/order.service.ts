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

export const OrderService ={
    createOrderDB,
    getAllOrdersDB
}
