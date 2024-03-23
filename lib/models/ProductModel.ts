import mongoose from "mongoose"

const productSchema = new mongoose.Schema(
    {
        name:{type:String, required:true},
        slug:{type:String, required:true, unique:true},
        category:{type:String, required:true},
        price:{type:Number, required:true},
        image:{type:String, required:true},
        rating:{type:Number, required:true, default:0},
        brand:{type:String, required:true},
        description:{type:String, required:true},
        numReviews:{type:Number, required:true,default:0},
        countInStock:{type:Number, required:true, default:0},
        isFeatured:{type:Boolean, required:false},
        banner:String,
    },
    {
        timestamps:true,
    }
)


const ProductModel = mongoose.models.Product || mongoose.model('Product',productSchema);

export default ProductModel;


export type Product = {
    _id?: string
    name: string
    slug: string
    price: number
    image: string
    banner: string
    brand: string
    description: string
    category: string
    rating: number
    numReviews: number
    countInStock: number
    color?: []
    size?:[]
}