import {defineStore} from 'pinia'
import type {MenuItemType} from '../types/user'
import {toast} from "vue3-toastify";
import {useUserStore} from "./userStore";


export const cartItems = ref<MenuItemType[]>([])

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: ref<MenuItemType[]>([]),
        shouldOpen: false,
    }),
    getters: {
        totalCount(): number {
            return cartItems.value.reduce((acc, item) => acc + item?.qty, 0)
        },

        subTotal(): number {
            const totalPrice = cartItems.value.reduce((acc, item) => {
                return acc + item.price * item.qty
            }, 0)
            return totalPrice
        },

        shippingPrice(): number {
            let deliveryCost: number = 3
            if (this.subTotal === 0) {
                deliveryCost = 0
                return deliveryCost
            }
            return deliveryCost
        },
        total(): number {
            return this.subTotal + this.shippingPrice
        },
    },
    actions: {
        saveCartToLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(cartItems.value))
        },
        loadCart() {
            const storedCart = localStorage.getItem('cart')
            if (storedCart) {
                cartItems.value = JSON.parse(storedCart)
            }
        },

        addItem(item: MenuItemType) {
            const existingItem = cartItems.value.find(i => i.id === item.id)
            if (existingItem) {
                existingItem.qty++
                toast.success('Product Added')
            } else {
                cartItems.value.push(item)
                toast.success('Product Added')
            }
            this.saveCartToLocalStorage()
            this.shouldOpen = true
        },

        removeItem(item: MenuItemType) {
            const existingItemIndex = cartItems.value.findIndex(i => i.id === item.id)

            if (existingItemIndex !== -1) {
                cartItems.value.splice(existingItemIndex, 1)
            }
            if (cartItems.value.length === 0) {
                item.qty = 1
                item.countInStock = 9
            }
            toast.success('Product removed')
            this.saveCartToLocalStorage()
        },

        async placeOrder(order) {
            try {
                const response = await $fetch('/api/shop/order', {
                    method: 'POST',
                    body: JSON.stringify(order),
                    headers: {'Content-Type': 'application/json'},
                })

                if (response) {
                    // @ts-ignore
                    const orderId: string = response.createdOrder._id as string
                    console.log(orderId)

                    toast.success('Thank You', {
                        "autoClose": 1000,
                        "position": "bottom-center",
                        "transition": "zoom",
                        toastClassName: 'toast-center'
                    })
                    await useUserStore().getMyOrders()

                }
            } catch (error) {
                throw error
            }
        },
        clearCart() {
            localStorage.removeItem('cart')
            cartItems.value = []
        },

        clear() {
            cartItems.value = []
        },
    },
})