import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const themeCookie = useCookie<string>('daisyui-theme', {
        maxAge: 60 * 60 * 24 * 365,
        default: () => 'dark',
    })

    // theme used in app.vue as :data-theme
    const theme = computed(() => themeCookie.value)

    // true = dark mode (checkbox checked = MOON visible), false = light mode (SUN visible)
    const toggleTheme = computed({
        get: () => themeCookie.value === 'dark',
        set: (val: boolean) => {
            themeCookie.value = val ? 'dark' : 'light'
        },
    })

    return { theme, toggleTheme }
})
