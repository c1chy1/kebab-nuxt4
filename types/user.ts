import { Types } from 'mongoose'
export interface ProductType {
    id:  number
    title: string
    img: string
    price: number,
    countInStock:number,
    qty: number
}
export interface Order {
    _id: Types.ObjectId
    user?: UserRequestBody
    id:  number
    img: string
    title: string
    price: number
    countInStock:number
    qty: number
}

export type MenuItemType = {
    id:  number
    img: string
    title: string
    price: number
    countInStock:number
    qty: number
}


export interface UserRequestBody {
    username: string
    email: string
    password: string
}
export interface signUpReq {
    email: string,
    password: string,
}

export interface getUserRes{
    success: boolean,
    message: {
        user: Pick<signUpReq, 'email'>
    }
}

export type logInReq = Pick<signUpReq, 'email' | 'password'>

export interface logoutReq{
    token: string
}

export interface ISchema {
    username: string
    email: string
    role?: 'user' | 'admin'
    password: string
}

export interface IMethods {

    getAllUser(): Promise<{ success: boolean; message?: string; result: ISchema[] }>
}



export const Roles = {
    admin: 1,
    user: 2,
} as const;

export type Role = keyof typeof Roles;

