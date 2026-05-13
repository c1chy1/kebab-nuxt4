import {verifyToken} from "../../utils/jwt";
import User from "../../db/models/User";

export default defineEventHandler( async (event) => {
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