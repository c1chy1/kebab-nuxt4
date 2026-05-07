import { defineStore } from 'pinia'


export const useThemeStore = defineStore('theme', () => {
    const theme = ref(null);

    watch(theme, (value: any) => {
        localStorage.setItem('daisyui-theme', value);
    });

    const toggleTheme = ref(false);
    watch(toggleTheme, (value : boolean) => {
        if (value) {
            theme.value = 'dark';
        } else {
            theme.value = 'light';
        }
    });

    return { theme , toggleTheme}
})