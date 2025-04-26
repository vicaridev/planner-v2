import { useForm } from "react-hook-form";
import { ISignIn } from "../../../@types/auth";
import { AtSign, RectangleEllipsis } from "lucide-react";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../hooks/useContext/useAuth";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

interface LoginFormProps {
    isOpen: boolean,
    handleRegisterForm: () => void,
}


export const LoginForm = ({ isOpen, handleRegisterForm }: LoginFormProps) => {
    const { register, handleSubmit } = useForm<ISignIn>();
    const { signIn } = useAuth()
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()




    const handleSignIn = async (data: ISignIn) => {
        return await signIn(data).then((res) => {
            if (res.error) {
                if (res.status === 404) {
                    return enqueueSnackbar('Usuário não encontrado!', { variant: 'error' })
                }
                if (res.status === 401) {
                    return enqueueSnackbar('Email ou Senha incorreto(a)!', { variant: 'error' })
                }
            }
            enqueueSnackbar(res, { variant: 'success' })
            return navigate('/')
        })
    }

    return (
        <>
            {isOpen && (
                <form onSubmit={handleSubmit(handleSignIn)} className="w-full">
                    <div className="flex flex-col space-y-3 w-full">
                        <span className="text-center text-2xl">Login</span>
                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 focus-within:border-lime-400'>
                            <AtSign className='text-zinc-400 size-5' />
                            <input {...register("email")} placeholder="Email" type="email" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1 " />
                        </div>
                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2 min-h-3 focus-within:border-lime-400'>
                            <RectangleEllipsis className='text-zinc-400 size-5' />
                            <input {...register("password")} placeholder="Senha" type="password" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                        </div>
                        <Button size="full" type="submit">
                            Entrar
                        </Button>
                        <div className="flex flex-col items-center">
                            <p>
                                Não possui conta?
                            </p>
                            <a onClick={handleRegisterForm} className="text-zinc-400 hover:text-zinc-50 cursor-pointer">Cadastre-se</a>
                        </div>
                    </div>
                </form>

            )}
        </>
    )
}