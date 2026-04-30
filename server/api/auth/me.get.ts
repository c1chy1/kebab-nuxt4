import {verifyToken} from "../../utils/jwt";
import User from "../../db/models/User";

export default defineEventHandler( async (event) => {
    try {

        const token =  getCookie(event, 'token')

        let decoded = verifyToken(token as string)
        const user = await User.findById({
            _id: decoded._id,
        })
        return user


    } catch (err) {
        return Promise.reject(new Error(err))
    }
});