import mongoose from 'mongoose'

let isConnected = false

export default defineNitroPlugin(async (nitroApp) => {
    await connectToMongoDB()

    nitroApp.hooks.hook('close', async () => {
        if (isConnected) {
            await mongoose.disconnect()
            isConnected = false
            console.log('[MongoDB] Disconnected')
        }
    })
})

export async function connectToMongoDB() {
    if (isConnected && mongoose.connection.readyState === 1) {
        return
    }

    const config = useRuntimeConfig()

    if (!config.mongodbUri) {
        console.warn('[MongoDB] No MONGODB_URI configured, skipping connection')
        return
    }

    try {
        await mongoose.connect(config.mongodbUri, {
            bufferCommands: false,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 30000,
        })
        isConnected = true
        console.log('[MongoDB] Connected successfully')
    } catch (error) {
        isConnected = false
        console.error('[MongoDB] Connection error:', error)
        throw error
    }
}
