import Order from "../../db/models/Order";
import {verifyToken} from "../../utils/jwt";


export default defineEventHandler(async (event) => {


    const token = getCookie(event, 'token')

    if (token) {
        let decoded = verifyToken(token as string)

        const orders = await Order.find({user: decoded._id})

        return orders
    }

})