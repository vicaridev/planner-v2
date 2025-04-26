import { X } from "lucide-react"
import { FormEvent, useEffect } from "react";
import { Button } from "../../../components/Button";
import { useAuth } from "../../../hooks/useContext/useAuth";
import { formatDisplayDate } from "../../../utils/formatDisplayDate";

interface ConfirmInviteModalProps {
    isOpen: boolean,
    onClose: () => void,
    createTrip: (event: FormEvent<HTMLFormElement>) => void,
    destination: string,
    startsAt: Date | undefined,
    endsAt: Date | undefined,
}

export const ConfirmTripCreationModal = ({ isOpen, onClose, createTrip, destination, endsAt, startsAt }: ConfirmInviteModalProps) => {
    const { user } = useAuth();

    useEffect(() => {
        console.log(user)
    }, [user])
    return (
        <>
            {isOpen &&
                (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                        <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
                            <div className='space-y-2'>
                                <div className="flex items-center justify-between">
                                    <h2 className="font-lg font-semibold">Confirmar criação da viagem</h2>
                                    <button>
                                        <X onClick={onClose} className='size-5 text-zinc-400' />
                                    </button>
                                </div>
                                {user ? (<p className="text-sm text-zinc-400">
                                    Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">{destination}</span> nas datas de <span className="font-semibold text-zinc-100">{startsAt && endsAt ? formatDisplayDate(startsAt, endsAt) : null}</span> preencha seus dados abaixo:
                                </p>) : (
                                    <>
                                        <p>É necessário estar logado para criar uma nova viagem</p>
                                        <div className="flex justify-center gap-3 p-5">
                                            <Button>
                                                Cadastrar-se
                                            </Button>
                                            <Button variant="secondary_text">
                                                Entrar
                                            </Button>
                                        </div>
                                    </>

                                )}
                            </div>
                            <form onSubmit={createTrip} className='space-y-3'>
                                <Button type='submit' size="full" disabled={!user} variant={!user ? 'disabled' : 'primary'}>
                                    Confirmar criação de viagem
                                </Button>
                            </form>
                        </div>
                    </div>
                )
            }
        </>
    )
}