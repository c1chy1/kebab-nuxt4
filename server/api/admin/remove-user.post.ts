import User from "../../db/models/User";
import {verifyToken} from "../../utils/jwt";
import { connectToMongoDB } from "../../plugins/mongodb"

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

    const { userId } = await readBody(event)

    if (!userId) {
        throw createError({ statusCode: 400, message: 'userId is required' })
    }

    const targetUser = await User.findById(userId)

    if (!targetUser) {
        throw createError({ statusCode: 404, message: 'User not found' })
    }

    if (targetUser.role === 'admin') {
        throw createError({ statusCode: 403, message: 'Cannot delete admin account' })
    }

    await User.findByIdAndDelete(userId)

    return { success: true }

})
