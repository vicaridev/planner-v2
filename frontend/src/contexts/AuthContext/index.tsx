/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { IRegister, ISignIn } from "../../@types/auth";
import { IUser } from "../../@types/user";
import { api } from "../../lib/axios";
import errorsApiHandler from "../../utils/apiErrorHandler";

export interface IAuthContext {
    loading: boolean,
    user: IUser | undefined,
    isAuthenticated: () => boolean,
    signIn: (payload: ISignIn) => Promise<any>
    signUp: (payload: IRegister) => Promise<any>
    signOut: () => void
    setUser: Dispatch<SetStateAction<IUser | undefined>>
}

export const AuthContext = createContext({} as IAuthContext)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<IUser>()

    useEffect(() => {
        const storedUser = localStorage.getItem('@Auth:user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const isAuthenticated = () => {
        const storageUser = localStorage.getItem('@Auth:user')
        const storageToken = localStorage.getItem('@Auth:token')

        return !!storageUser && !!storageToken;
    }

    const signIn = async (payload: ISignIn) => {
        setLoading(true)
        try {
            const { data } = await api.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
                payload
            )
            if (data.user && data.token) {
                localStorage.setItem('@Auth:token', data.token)
                localStorage.setItem('@Auth:user', JSON.stringify(data.user))
                setUser(data.user)
            }
            console.log(user)
            setLoading(false)
            return 'Login realizado com sucesso!'
        } catch (error) {
            return errorsApiHandler(error)
        }
    }

    const signUp = async (payload: IRegister) => {
        setLoading(true)
        try {
            await api.post(
                `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
                payload
            )
        } catch (error) {
            return errorsApiHandler(error)
        }
        setLoading(false)
    }

    const signOut = () => {
        localStorage.removeItem('@Auth:user')
        localStorage.removeItem('@Auth:token')
        setUser(undefined)

        return {
            message: 'User disconnected'
        }
    }



    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                signOut,
                signIn,
                signUp,
                loading,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}