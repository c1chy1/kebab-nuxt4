
import type {logInReq,signUpReq,logoutReq, getUserRes} from '~/types/user'

const useApi = async function (url: string, body: Record<string, any> = {}): Promise<any> {
    const origin = useRequestURL().origin
    return $fetch(url, {
        baseURL: `${origin}/api`,
        method: 'POST',
        body,
        credentials: 'include',
        watch: false,
        async onResponseError({ response }) {
            const { toast } = await import('vue3-toastify')
            toast.error(response.body)
        },
    })
}
export async function login(body: logInReq) {
    return await useApi('/auth/login', body)
}
export async function register(body : signUpReq) {

    return await useApi('/auth/register', body)
}
export async function logOutUser(body: logoutReq) {
    return await useApi('/auth/logout', body)
}

export async function order(body:any) {
    return await useApi('/shop/order', body)
}



