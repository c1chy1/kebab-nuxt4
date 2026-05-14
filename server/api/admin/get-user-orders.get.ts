import Order from "../../db/models/Order";
import {verifyToken} from "../../utils/jwt";


export default defineEventHandler(async (event) => {

    const token = getCookie(event, 'token')

    if (!token) {
        throw createError({ statusCode: 401, message: 'Unauthorized' })
    }

    const decoded = verifyToken(token as string) as { _id: string; role: string }

    if (decoded.role !== 'admin') {
        throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const { userId } = getQuery(event)

    if (!userId) {
        throw createError({ statusCode: 400, message: 'userId is required' })
    }

    const orders = await Order.find({ user: userId })

    return orders

})
