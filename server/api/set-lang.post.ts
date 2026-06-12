const VALID_LANGS = ['en', 'pl', 'de', 'tr']

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const lang = body?.lang

    if (!VALID_LANGS.includes(lang)) {
        throw createError({ statusCode: 400, message: 'Invalid lang' })
    }

    setCookie(event, 'preferred-lang', lang, {
        maxAge: 60 * 60 * 24 * 365,
        path: '/',
        httpOnly: false,
        sameSite: 'lax',
    })

    return { ok: true }
})
