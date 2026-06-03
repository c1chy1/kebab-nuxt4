import User from "../../db/models/User"
import jwt from 'jsonwebtoken';
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler(async (event) => {
    await connectToMongoDB()

    const body = await readBody(event)

    const user = await User.findOne(
        { email: body.email },
    )

    if (!user) {
        const user = await User.create(body)

        const token: string =  jwt.sign({ _id:user._id.toString(), role: user.role }, useRuntimeConfig().jwtSecret);
        setCookie(event,'token',token,{
            httpOnly: true,
            maxAge: 86400
        })

        return {
            success:  true,
            message: {
                user,
                token,
            },
        }

    }
   else {
       return {
                 success: false,
                 message: "errors.emailExists"

            }

    }})







