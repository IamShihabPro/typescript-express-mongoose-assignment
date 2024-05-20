import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductDB = async (product: TProduct) =>{
    const result = await Product.create(product)
    return result
}

const getAllProductsDB = async () => {
    const result = await Product.find()
    return result
  }

const getSingleProductDB = async (_id: string) => {
    const result = await Product.findOne({ _id })
    return result
}

const updateSingleProductDB = async (_id: string, updateData: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    return result;
};

const searchProductsDB = async (searchTerm: string) => {
    const searchRegex = new RegExp(searchTerm, 'i');
    const products = await Product.aggregate([
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
};


export const ProductService = {
    createProductDB,
    getAllProductsDB,
    getSingleProductDB,
    updateSingleProductDB,
    searchProductsDB,
}