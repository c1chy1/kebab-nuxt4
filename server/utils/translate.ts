export const SUPPORTED_LOCALES = ['en', 'de', 'pl', 'tr'] as const
export type SupportedLocale = typeof SUPPORTED_LOCALES[number]

/**
 * Translates `text` from `source` locale to `target` locale
 * using the free MyMemory API (no API key needed).
 */
async function translateOne(text: string, source: SupportedLocale, target: SupportedLocale): Promise<string> {
    if (source === target || !text) return text
    try {
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${source}|${target}`
        const res = await $fetch<any>(url)
        const translated = res?.responseData?.translatedText
        return typeof translated === 'string' && translated.length ? translated : text
    } catch {
        return text
    }
}

/**
 * Returns a full localized title map based on `text` in `source` locale.
 */
export async function translateToAllLocales(text: string, source: SupportedLocale) {
    const entries = await Promise.all(
        SUPPORTED_LOCALES.map(async (locale) => [locale, await translateOne(text, source, locale)] as const)
    )
    return Object.fromEntries(entries) as Record<SupportedLocale, string>
}