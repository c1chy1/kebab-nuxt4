import {verifyToken} from "../../utils/jwt";
import User from "../../db/models/User";
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler( async (event) => {
    await connectToMongoDB()
    const token = getCookie(event, 'token')

    if (!token) return null

    try {
        const decoded = verifyToken(token)
        const user = await User.findById({ _id: decoded._id })
        return user
    } catch (err) {
        return null
    }
});