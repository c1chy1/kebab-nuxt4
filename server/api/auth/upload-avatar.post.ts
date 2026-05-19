import { verifyToken } from "../../utils/jwt"
import User from "../../db/models/User"
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'

export default defineEventHandler(async (event) => {
    const token = getCookie(event, 'token')
    if (!token) return createError({ statusCode: 401, message: 'Unauthorized' })

    try {
        const decoded = verifyToken(token)
        const formData = await readMultipartFormData(event)

        if (!formData || formData.length === 0) {
            return { success: false, error: 'No file provided' }
        }

        const file = formData[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']
        if (!file.type || !allowedTypes.includes(file.type)) {
            return { success: false, error: 'Invalid file type. Only JPEG, PNG, WebP and GIF allowed.' }
        }

        const ext = file.filename?.split('.').pop()?.toLowerCase() || 'jpg'
        const filename = `${decoded._id}.${ext}`
        const uploadsDir = join(process.cwd(), 'public', 'uploads', 'avatars')

        await mkdir(uploadsDir, { recursive: true })
        await writeFile(join(uploadsDir, filename), file.data)

        const profilePicture = `/uploads/avatars/${filename}`
        await User.findByIdAndUpdate(decoded._id, { profilePicture })

        return { success: true, profilePicture }
    } catch (err: any) {
        return { success: false, error: err.message }
    }
})
