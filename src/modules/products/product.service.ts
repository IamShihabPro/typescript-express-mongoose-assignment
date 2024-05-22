import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductDB = async (product: TProduct) =>{
    const result = await Product.create(product)
    return result
}


const getAllProductsDB = async (searchTerm: string) => {
    if (searchTerm) {
      const regex = new RegExp(searchTerm as string, 'i')
      const result = await Product.find({
        $or: [{ name: regex }, { description: regex }, { category: regex }],
      })
      console.log(result)
      return result
    }
    return await Product.find()
  }
  

const getSingleProductDB = async (_id: string) => {
    const result = await Product.findOne({ _id })
    return result
}

const updateSingleProductDB = async (_id: string, updateData: Partial<TProduct>) => {
    const result = await Product.findByIdAndUpdate(_id, updateData, { new: true });
    return result;
};

const deleteProductDB = async(_id: string) =>{
    const result = await Product.deleteOne({_id})
    return result
}

export const ProductService = {
    createProductDB,
    getAllProductsDB,
    getSingleProductDB,
    updateSingleProductDB,
    deleteProductDB,
}