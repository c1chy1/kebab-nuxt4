import mongoose, { Document, Schema } from 'mongoose'

export type LocalizedTitle = {
    en: string
    de: string
    pl: string
    tr: string
}

export type LocalizedDescription = LocalizedTitle

type ProductDocument = Document & {
    id: number
    img: string
    title: LocalizedTitle
    description: LocalizedDescription
    price: number
    countInStock: number
    qty: number
}

const localizedTitleSchema = new Schema<LocalizedTitle>({
    en: { type: String, default: '' },
    de: { type: String, default: '' },
    pl: { type: String, default: '' },
    tr: { type: String, default: '' },
}, { _id: false })

const productSchema = new Schema({
    id: { type: Number, required: true, unique: true },
    img: { type: String, required: true },
    title: { type: localizedTitleSchema, required: true },
    description: { type: localizedTitleSchema, default: () => ({ en: '', de: '', pl: '', tr: '' }) },
    price: { type: Number, required: true },
    countInStock: { type: Number, default: 9 },
    qty: { type: Number, default: 1 },
})

const Product = mongoose.model<ProductDocument>('Product', productSchema)
export default Product