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
            const data = await $fetch<Object>('/api/auth/me')
            this.userInfo = data
            await this.getMyOrders()

        },
        getMyOrders: async function () {
            const data = await $fetch<[]>('/api/shop/get-my-orders')
            this.orders = data

        },
        async login(body: logInReq) {
            const {success, message, error} = await login(body)
            this.error = error?.message
            if (success) {

                const token = useCookie('token')
                token.value = message.token
                setToken(message.token)
                this.isLoggedIn = true
                this.userInfo = message.user
                toast.success("Logged In")
                await this.getMyOrders()
            } else {
                toast.error(error?.message)
            }
        },


        async register(body: signUpReq) {
            const {success, message} = await register(body)
            if (success) {
                const token = useCookie('token')
                token.value = message.token
                setToken(message.token)
                this.userInfo = message.user
                this.isLoggedIn = true
                toast.success('Register Success')

            } else {
                toast.error(message)
            }

        },

        async logout() {
            const {success} = await logOutUser({token: getToken()!})
            if (success) {
                const token = useCookie('token')
                token.value = ''
                clearToken()
                this.isLoggedIn = false
                toast.success("Logged Out")
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