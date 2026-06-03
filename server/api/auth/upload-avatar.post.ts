import { put } from '@vercel/blob'
import { verifyToken } from "../../utils/jwt"
import User from "../../db/models/User"
import { connectToMongoDB } from "../../plugins/mongodb"

export default defineEventHandler(async (event) => {
    await connectToMongoDB()
    const token = getCookie(event, 'token')
    if (!token) return createError({ statusCode: 401, message: 'Unauthorized' })

    try {
        const decoded = verifyToken(token)
        const formData = await readMultipartFormData(event)

        if (!formData || formData.length === 0) {
            return { success: false, error: 'errors.noFile' }
        }

        const file = formData[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (!file.type || !allowedTypes.includes(file.type)) {
            return { success: false, error: 'errors.invalidFileType' }
        }

        const ext = file.filename?.split('.').pop()?.toLowerCase() || 'jpg'
        const filename = `avatars/${decoded._id}.${ext}`

        const blob = await put(filename, file.data, {
            access: 'public',
            contentType: file.type,
            allowOverwrite: true,
        })

        await User.findByIdAndUpdate(decoded._id, { profilePicture: blob.url })

        return { success: true, profilePicture: blob.url }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
})
