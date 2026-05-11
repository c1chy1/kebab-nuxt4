module.exports = {
    content: [
        './app/components/**/*.{js,vue,ts}',
        './app/composables/**/*.{js,vue,ts}',
        './app/layouts/**/*.vue',
        './app/pages/**/*.vue',
        './app/plugins/**/*.{js,ts}',
        './app/app.vue',
        './server/**/*.{js,ts}',
    ],

    theme: {
        screens: {
            sm: "576px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        extend: {
            fontFamily: {
                bebas: ["Bebas Neue"],
                alfa: ["Alfa Slab One"],
                mont: ["Montserrat"],
            },
            animation: {
                shake: 'shake 2.5s cubic-bezier(.36,.07,.19,.97) infinite',
            },
            keyframes: {
                shake: {
                    '10%, 90%' : {
                        transform: 'translate3d(-1px, 0,0)'
                    }, '20%, 80%': {
                        transform: 'translate3d(2px,0,0)'
                    },
                    '30%,50%,70%' : {
                        transform: 'translate3d(-4px,0,0)'
                    },
                    '40%,60%': {
                        transform: 'translate3d(4px,0,0)'
                    }
                }
            }

        },
    },
    daisyui: {
        themes: [
            {
                light: {
                    'primary': '#006b00',
                    'secondary': '#ff6d00',
                    'accent':'#ffc045',
                    'shadow': '#fee7ba',
                    'neutral': '#ffe6d4',
                    'info': '#56949f',
                    'success': '#907aa9',
                    'warning': '#ea9d34',
                    'error': '#eb6f92',
                },
            },
            {
                dark: {
                    'primary': '#393552',
                    'secondary': '#a67925',
                    'accent': '#eb6f92',
                    'neutral': '#393552',
                    'base-100': '#393552',
                    'info': '#9ccfd8',
                    'success': '#c4a7e7',
                    'warning': '#f6c177',
                    'error': '#b4637a',
                },
            },
        ],
    },
    plugins: [require("daisyui"),require('@tailwindcss/typography')],
}