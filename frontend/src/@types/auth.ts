import { IUser } from "./user"

export interface ISignIn {
    email: string,
    password: string,
}

export interface ISignInReponse {
    user: IUser
    token: string
}

export interface IRegister {
    name: string,
    email: string,
    password: string
}