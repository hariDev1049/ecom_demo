import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel, { Product } from "../models/ProductModel";


export const revalidate = 3600;

const getLatest = cache(async()=>{
    await dbConnect();
    const products = await ProductModel.find({}).sort({ _id:-1}).limit(4).lean();

    return products as Product[]
})


const getFeatured = cache(async()=>{
    await dbConnect();
    const featuredProducts = await ProductModel.find({isFeatured:true}).limit(3).lean()
    return featuredProducts;
})


const getProductBySlug = cache(async(slug:String)=>{
    await dbConnect();
    const product = await ProductModel.findOne({slug}).lean();
    return product as Product
})



const productServices = {
    getLatest,
    getFeatured,
    getProductBySlug,
}

export default productServices;