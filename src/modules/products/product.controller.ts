import { Request, Response } from 'express'
import { ProductService } from './product.service'

// create product
const createProduct = async(req: Request, res: Response) =>{
    try {
        const productData = req.body
        const result = await ProductService.createProductDB(productData)
        res.status(200).json({
            "success": true,
            "message": "Product created successfully!",
            data: result
        })
    } catch (error) {
        console.log(error)
    }
}

// get all product
const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductService.getAllProductsDB()
      res.status(200).json({
        success: true,
        message: 'Product are retrived successfully',
        data: result,
      })
    } catch (error) {
      console.log(error)
    }
  }

//   get single product
const getSingleProduct = async (req: Request, res: Response) =>{
    try {
        const {productId} = req.params
        const result = await ProductService.getSingleProductDB(productId)
        res.status(200).json({
            success: true,
            message: "Product are fetched successfully !",
            data: result,
          });
    } catch (error) {
        console.log(error)
    }
}

// Update single product
const updateSingleProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const updateData = req.body;
        const result = await ProductService.updateSingleProductDB(productId, updateData);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while updating the product.",
        });
    }
};

// search query
const searchProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const products = await ProductService.searchProductsDB(searchTerm);
        res.status(200).json({
            success: true,
            message: `Products matching search term '${searchTerm}' fetched successfully!`,
            data: products,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching products.",
        });
    }
};

  

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    searchProducts,
}