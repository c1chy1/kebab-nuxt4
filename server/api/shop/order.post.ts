import User from "../../db/models/User"
import Order from "../../db/models/Order"
import {verifyToken} from "../../utils/jwt";
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler(async event => {
    await connectToMongoDB()

    const body = await readBody(event)

    const token = getCookie(event, 'token')
    if (token) {
        let decoded = verifyToken(token as string) as { _id: string }

        const user = User.findById({
            _id: decoded._id,
        })
        const {
            orderItems,
            totalPrice
        } = body

        if (orderItems && orderItems.length === 0) {
            throw createError({
                statusCode: 400,
                statusMessage: 'No order items',
            })
        } else {
            const orderItemsWithProductData = orderItems.map(item => {
                const productData = {
                    img: item.img,
                    title: item.title,
                    qty: item.qty,
                    _id: decoded._id,
                    price: item.price
                }


                return productData
            })

            const order = new Order({
                orderItems: orderItemsWithProductData,
                user: {
                    _id: decoded._id,
                    ...user,
                },
                totalPrice,
            })

            const createdOrder = await order.save()
            return {createdOrder}
        }

    } else {
        throw createError({
            statusCode: 400,
            statusMessage: 'You Need To Log In',
        })
    }
})
