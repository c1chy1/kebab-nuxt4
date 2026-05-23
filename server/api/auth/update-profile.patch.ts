import { verifyToken } from "../../utils/jwt"
import User from "../../db/models/User"
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler(async (event) => {
    await connectToMongoDB()
    const token = getCookie(event, 'token')
    if (!token) return createError({ statusCode: 401, message: 'Unauthorized' })

    try {
        const decoded = verifyToken(token)
        const body = await readBody(event)

        const user = await User.findByIdAndUpdate(
            decoded._id,
            { username: body.username },
            { returnDocument: 'after' }
        )

        const { password, ...safeUser } = user!.toObject()
        return { success: true, user: safeUser }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
})
