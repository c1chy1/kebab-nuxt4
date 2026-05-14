import User from "../../db/models/User";
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

    const users = await User.find({}, { password: 0 })

    return users

})
