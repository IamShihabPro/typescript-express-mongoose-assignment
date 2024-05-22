import { TOrder } from "./order.interface"
import { Order } from "./order.model"

const createOrderDB = async (order: TOrder) =>{
    const result = await Order.create(order)
    return result
}


const getAllOrdersDB = async (email: string) => {
    if (email) {
      const result = await Order.aggregate([
        {
          $match: { email: email },
        },
        {
          $project: {
            __v: 0,
          },
        },
      ])
      return result
    } else {
      return await Order.find()
    }
  }

export const OrderService ={
    createOrderDB,
    getAllOrdersDB,
}
