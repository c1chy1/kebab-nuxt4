import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const themeCookie = useCookie<string>('daisyui-theme', {
        maxAge: 60 * 60 * 24 * 365,
        default: () => 'light',
    })

    const theme = computed(() => themeCookie.value)

    const toggleTheme = computed({
        get: () => themeCookie.value === 'dark',
        set: (val: boolean) => {
            themeCookie.value = val ? 'dark' : 'light'
        },
    })

    return { theme, toggleTheme }
})
