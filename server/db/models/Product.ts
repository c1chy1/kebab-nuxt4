import mongoose, { Document, Schema } from 'mongoose'

type ProductDocument = Document & {
    id: number
    img: string
    title: string
    price: number
    countInStock: number
    qty: number
}

const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    img: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 9 },
    qty: { type: Number, default: 1 },
})

const Product = mongoose.model<ProductDocument>('Product', productSchema)
export default Product
