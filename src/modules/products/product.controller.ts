import { Request, Response } from 'express'
import { ProductService } from './product.service'
import TProductValidationSchema from './product.zod.validation'

// create product
const createProduct = async(req: Request, res: Response) =>{
    try {
        const productData = req.body
        const zodParsedData = TProductValidationSchema.parse(productData)
        const result = await ProductService.createProductDB(zodParsedData)

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
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while create the product.",
        });
    }
}

// get all product
const getAllProducts = async (req: Request, res: Response) => {
    try {
      const result = await ProductService.getAllProductsDB()

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

//   get single product
const getSingleProduct = async (req: Request, res: Response) =>{
    try {
        const {productId} = req.params
        const result = await ProductService.getSingleProductDB(productId)
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching the product.",
        });
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

// delete product
const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { productId } = req.params;
        const result = await ProductService.deleteProductDB(productId);
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
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "An error occurred while deleting the product.",
        });
    }
};

export const productController = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    searchProducts,
    deleteProduct,
}