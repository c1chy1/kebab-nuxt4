import Product from '../db/models/Product'
import { connectToMongoDB } from '../plugins/mongodb'

const DEFAULT_PRODUCTS = [
    { id: 1, img: 'images/menu-slides/menu_1.png', title: 'Hamburger1', price: 11, countInStock: 9, qty: 1 },
    { id: 2, img: 'images/menu-slides/menu_2.png', title: 'Hamburger2', price: 12, countInStock: 9, qty: 1 },
    { id: 3, img: 'images/menu-slides/menu_3.png', title: 'Hamburger3', price: 10, countInStock: 9, qty: 1 },
    { id: 4, img: 'images/menu-slides/menu_4.png', title: 'Hamburger4', price: 13, countInStock: 9, qty: 1 },
    { id: 5, img: 'images/menu-slides/menu_2.png', title: 'Hamburger5', price: 15, countInStock: 9, qty: 1 },
    { id: 6, img: 'images/menu-slides/menu_3.png', title: 'Hamburger6', price: 12, countInStock: 9, qty: 1 },
]

export default defineEventHandler(async () => {
    await connectToMongoDB()

    const count = await Product.countDocuments()
    if (count === 0) {
        await Product.insertMany(DEFAULT_PRODUCTS)
    }

    return Product.find().sort({ id: 1 })
})
