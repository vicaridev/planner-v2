import { ArrowBigLeft, AtSign, CaseSensitive, RectangleEllipsis } from "lucide-react"
import { Button } from "../../../components/Button";

interface RegisterFormProps {
    isOpen: boolean;
    handleLoginForm: () => void
}

export const RegisterForm = ({ isOpen, handleLoginForm }: RegisterFormProps) => {
    return (
        <>
            {isOpen && (
                <div className="flex flex-col space-y-3 w-full">
                    <div className="flex justify-between items-center h-10">
                        <Button variant="action" onClick={handleLoginForm}>
                            <ArrowBigLeft />
                        </Button>
                        <span className="text-2xl">
                            <p className="pr-5">Cadastro</p>
                        </span>
                    </div>
                    <form action="" className="space-y-2">
                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <CaseSensitive className='text-zinc-400 size-5' />
                            <input name='name' placeholder="Nome" type="text" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                        </div>
                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <AtSign className='text-zinc-400 size-5' />
                            <input name='email' placeholder="Email" type="email" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                        </div>
                        <div className='h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2'>
                            <RectangleEllipsis className='text-zinc-400 size-5' />
                            <input name='password' placeholder="Senha" type="password" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" />
                        </div>
                        <Button size="full">
                            Cadastrar-se
                        </Button>
                    </form>
                </div>
            )}
        </>
    )
}