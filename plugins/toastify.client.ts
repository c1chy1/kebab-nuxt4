import Vue3Toasity, { type ToastContainerOptions, toast, type ToastOptions } from 'vue3-toastify'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toasity) as ToastContainerOptions
    return {
        provide: {
            toastify: (msg: string) => {
                toast(msg, {
                    autoClose: 5000,
                    position: toast.POSITION.BOTTOM_CENTER,
                    newestOnTop: true,
                    pauseOnHover: true,
                } as ToastOptions)
            }
        }
    }
})