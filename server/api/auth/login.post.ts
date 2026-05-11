import User from "../../db/models/User"


export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)

        const userData = await User.findByCredentials(body.email, body.password)
        const user = await User.findOne(
            { email: userData.email },
        )
        const token = await user!.generateAuthToken()
        setCookie(event, 'token', token)


        return {
            success: true,
            message: {
                user,
                token
            },
        }
    }
    catch (error: any) {
        console.error(error.message)
        return {
            success: false,
            error: {
                code: 1001,
                message: error.message,
            },
        }
    }
})