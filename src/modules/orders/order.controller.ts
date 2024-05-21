import express, { Request, Response } from 'express'
import { OrderService } from './order.service'
import TOrderValidationSchema from './order.zod.validation'

// create order
const createOrder = async(req: Request, res: Response) =>{
   try {
    const orderData = req.body
    const zodParsedData = TOrderValidationSchema.parse(orderData)
    const result = await OrderService.createOrderDB(zodParsedData)

    if (!result) {
        return res.status(404).json({
            success: false,
            message: "Order cannot created",
        });
    }
    res.status(200).json({
        "success": true,
        "message": "Order created successfully!",
        data: result
    })
   } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while create the order.",
        });
   }
}

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
    try {
      const result = await OrderService.getAllOrdersDB()

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
      })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrived the product.",
        });
    }
  }

  // Get orders by email
  const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email parameter is missing in the request.",
            });
        }

        const result = await OrderService.getOrdersByEmailDB(email);

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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while retrieving the orders.",
        });
    }
};


export const orderController ={
    createOrder,
    getAllOrders,
    getOrdersByEmail
}