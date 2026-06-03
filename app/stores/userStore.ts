import {defineStore} from "pinia"
import {register, logOutUser, login} from "~/composables/useApi";
import type {logInReq, signUpReq} from '~/types/user'
import {toast} from 'vue3-toastify'

export const useUserStore = defineStore('User', {
    state: () => {
        return {
            id: '',
            isLoggedIn: false,
            userInfo: {},
            isAdmin: false,
            orders: [],
            error: ''
        }
    },
    getters: {
        User(state) {
            return state.userInfo
        },
        async Orders(state) {
            return state.orders
        },

    },
    actions: {


        async me() {
            const data = await $fetch<any>('/api/auth/me')
            if (!data) return
            this.userInfo = data
            this.isAdmin = data?.role === 'admin'
            this.isLoggedIn = true
            await this.getMyOrders()
        },
        getMyOrders: async function () {
            const data = await $fetch<[]>('/api/shop/get-my-orders')
            this.orders = data

        },
        async login(body: logInReq) {
            const { $i18n } = useNuxtApp()

            function setToken(token: string): void {
                localStorage.setItem('token', token)
            }

            const {success, message, error} = await login(body)
            this.error = error?.message
            if (success) {

                const token = useCookie('token')
                token.value = message.token
                setToken(message.token)
                this.isLoggedIn = true
                this.userInfo = message.user
                this.isAdmin = message.user?.role === 'admin'
                toast.success($i18n.t('toast.loggedIn'))
                await this.getMyOrders()
            } else {
                toast.error($i18n.t(error?.message))
            }
        },


        async register(body: signUpReq) {
            const { $i18n } = useNuxtApp()

            function setToken(token: string): void {
                localStorage.setItem('token', token)
            }
            const {success, message} = await register(body)
            if (success) {
                const token = useCookie('token')
                token.value = message.token
                setToken(message.token)
                this.userInfo = message.user
                this.isAdmin = message.user?.role === 'admin'
                this.isLoggedIn = true
                toast.success($i18n.t('toast.registerSuccess'))

            } else {
                toast.error($i18n.t(message))
            }

        },

        async updateProfile(username: string) {
            const { $i18n } = useNuxtApp()
            const data = await $fetch<any>('/api/auth/update-profile', {
                method: 'PATCH',
                body: { username }
            })
            if (data.success) {
                this.userInfo = data.user
                toast.success($i18n.t('toast.profileUpdated'))
            } else {
                toast.error(data.error)
            }
        },

        async uploadAvatar(file: File) {
            const { $i18n } = useNuxtApp()
            const formData = new FormData()
            formData.append('avatar', file)
            const data = await $fetch<any>('/api/auth/upload-avatar', {
                method: 'POST',
                body: formData
            })
            if (data.success) {
                (this.userInfo as any).profilePicture = data.profilePicture
                toast.success($i18n.t('toast.avatarUpdated'))
            } else {
                toast.error($i18n.t(data.error))
            }
        },

        async logout() {
            const { $i18n } = useNuxtApp()

         function getToken() {

                if (process.client) {
                    return localStorage.getItem('token')
                }
            }
           function clearToken(): void {
                localStorage.removeItem('token')
            }
            const {success} = await logOutUser({token: getToken()!})
            if (success) {
                const token = useCookie('token')
                token.value = ''
                clearToken()
                this.isLoggedIn = false
                toast.success($i18n.t('toast.loggedOut'))
                if (process.client) {
                    window.document.body.classList.remove("ml-12", "md:ml-60")
                    window.document.body.classList.add("ml-0", "transition-all", "duration-500")
                }

            }
        },
    },
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))