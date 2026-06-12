import Product from '../../db/models/Product'
import { verifyToken } from '../../utils/jwt'
import { connectToMongoDB } from '../../plugins/mongodb'

export default defineEventHandler(async (event) => {
    await connectToMongoDB()

    const token = getCookie(event, 'token')

    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const decoded = verifyToken(token as string) as { _id: string; role: string }

    if (decoded.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const body = await readBody(event)
    const { id, title, price } = body

    if (!id || !title || price === undefined) {
        throw createError({ statusCode: 400, message: 'Missing fields' })
    }

    const product = await Product.findOneAndUpdate(
        { id },
        { title, price: Number(price) },
        { returnDocument: 'after' }
    )

    if (!product) {
        throw createError({ statusCode: 404, message: 'Product not found' })
    }

    return product
})
