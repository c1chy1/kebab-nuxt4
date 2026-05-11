import { defineStore } from 'pinia'


export const useThemeStore = defineStore('theme', () => {
    const theme = ref(null);

    watch(theme, (value: any) => {
        localStorage.setItem('daisyui-theme', value);
    });

    const toggleTheme = ref(false);
    watch(toggleTheme, (value : boolean) => {
        if (value) {
            theme.value = 'light';
        } else {
            theme.value = 'dark';
        }
    });

    return { theme , toggleTheme}
})