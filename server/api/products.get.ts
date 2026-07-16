import Product from '../db/models/Product'
import { connectToMongoDB } from '../plugins/mongodb'

const DEFAULT_PRODUCTS = [
    { id: 1, img: 'images/menu-slides/menu_1.png', title: { en: 'Hamburger1', de: 'Hamburger1', pl: 'Hamburger1', tr: 'Hamburger1' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 11, countInStock: 9, qty: 1 },
    { id: 2, img: 'images/menu-slides/menu_2.png', title: { en: 'Hamburger2', de: 'Hamburger2', pl: 'Hamburger2', tr: 'Hamburger2' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 12, countInStock: 9, qty: 1 },
    { id: 3, img: 'images/menu-slides/menu_3.png', title: { en: 'Hamburger3', de: 'Hamburger3', pl: 'Hamburger3', tr: 'Hamburger3' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 10, countInStock: 9, qty: 1 },
    { id: 4, img: 'images/menu-slides/menu_4.png', title: { en: 'Hamburger4', de: 'Hamburger4', pl: 'Hamburger4', tr: 'Hamburger4' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 13, countInStock: 9, qty: 1 },
    { id: 5, img: 'images/menu-slides/menu_2.png', title: { en: 'Hamburger5', de: 'Hamburger5', pl: 'Hamburger5', tr: 'Hamburger5' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 15, countInStock: 9, qty: 1 },
    { id: 6, img: 'images/menu-slides/menu_3.png', title: { en: 'Hamburger6', de: 'Hamburger6', pl: 'Hamburger6', tr: 'Hamburger6' }, description: { en: 'Classic burger', de: 'Klassischer Burger', pl: 'Klasyczny burger', tr: 'Klasik burger' }, price: 12, countInStock: 9, qty: 1 },
]

export default defineEventHandler(async () => {
    await connectToMongoDB()

    const count = await Product.countDocuments()
    if (count === 0) {
        await Product.insertMany(DEFAULT_PRODUCTS)
    }

    return Product.find().sort({ id: 1 })
})