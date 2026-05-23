import Order from "../../db/models/Order";
import {verifyToken} from "../../utils/jwt";
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler(async (event) => {
    await connectToMongoDB()


    const token = getCookie(event, 'token')

    if (token) {
        let decoded = verifyToken(token as string)

        const orders = await Order.find({user: decoded._id})

        return orders
    }

})