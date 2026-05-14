import {defineStore} from 'pinia'

export const useAdminStore = defineStore('admin', {
    state: () => ({
        users: [] as any[],
        selectedUserOrders: [] as any[],
        selectedUsername: '' as string,
    }),
    actions: {
        async getUsers() {
            const data = await $fetch<any[]>('/api/admin/get-users')
            this.users = data
        },
        async removeUser(userId: string) {
            await $fetch('/api/admin/remove-user', {
                method: 'POST',
                body: { userId },
            })
            this.users = this.users.filter(u => u._id !== userId)
        },
        async getUserOrders(userId: string, username: string) {
            const data = await $fetch<any[]>('/api/admin/get-user-orders', {
                query: { userId },
            })
            this.selectedUserOrders = data
            this.selectedUsername = username
        },
    },
})

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
