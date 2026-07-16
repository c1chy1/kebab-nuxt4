import Product from '../../db/models/Product'
import { verifyToken } from '../../utils/jwt'
import { connectToMongoDB } from '../../plugins/mongodb'
import { SUPPORTED_LOCALES, translateToAllLocales, type SupportedLocale } from '../../utils/translate'

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
    const { id, title, description, price, sourceLocale } = body as {
        id: number
        title: string
        description?: string
        price: number
        sourceLocale?: SupportedLocale
    }

    if (!id || !title || price === undefined) {
        throw createError({ statusCode: 400, message: 'Missing fields' })
    }

    const source: SupportedLocale = SUPPORTED_LOCALES.includes(sourceLocale as SupportedLocale)
        ? (sourceLocale as SupportedLocale)
        : 'en'

    const localizedTitle = await translateToAllLocales(title, source)
    const localizedDescription = description
        ? await translateToAllLocales(description, source)
        : { en: '', de: '', pl: '', tr: '' }

    const product = await Product.findOneAndUpdate(
        { id },
        { title: localizedTitle, description: localizedDescription, price: Number(price) },
        { returnDocument: 'after' }
    )

    if (!product) {
        throw createError({ statusCode: 404, message: 'Product not found' })
    }

    return product
})