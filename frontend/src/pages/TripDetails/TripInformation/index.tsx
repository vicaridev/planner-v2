import { format } from "date-fns"
import { Calendar, MapPin, Settings2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../../../components/Button"
import { useTrip } from "../../../hooks/useContext/useTripDetails"
import { BeatLoader } from "react-spinners"
import { UpdateTripModal } from "./UpdateTripModal"



export const TripInformation = () => {
    const { trip_id } = useParams()
    const { getTrip, trip, tripIsLoading } = useTrip()
    const [updateTripModaIsOpen, setUpdateTripModalIsOpen] = useState<boolean>(false)


    const handleUpdateTripModal = () => {
        setUpdateTripModalIsOpen(!updateTripModaIsOpen)
    }

    useEffect(() => {
        if (trip_id)
            getTrip(trip_id)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const displayDate = trip ?

        format(trip.starts_at, "d ' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d ' de 'LLL"))
        : null

    return (
        <div className="px-4 py-4 h-36 md:h-16 bg-zinc-900 shadow-shape rounded-xl flex flex-col md:flex-row items-center justify-center sm:justify-between">
            {!tripIsLoading ? (
                <>
                    <div className="flex justify-center py-2 sm:py-0 sm:gap-2">
                        <MapPin className="size-5 text-zinc-400"/>
                        <span className="text-zinc-100 sm:flex sm:text-sm">
                            {trip?.destination}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row items-center sm:gap-3">
                        <div className='block sm:hidden w-full h-px bg-zinc-700'></div>
                            <div className="flex items-center gap-2 py-2">
                                <Calendar className="size-5 text-zinc-400" />
                                <span className=" text-zinc-100 sm:text-sm">
                                    {displayDate}
                                </span>
                            </div>
                            <div className='hidden sm:block w-px h-6 bg-zinc-700'></div>
                            <Button onClick={handleUpdateTripModal} variant="secondary_text">
                                Alterar local e data
                                <Settings2 className='size-5' />
                            </Button>
                    </div>
                </>) : (
                <div className="flex items-center justify-center w-full gap-3">
                    <p>Carregando informações da viagem</p>
                    <BeatLoader color="#3f3f46" size={10} />
                </div>
            )}
            <UpdateTripModal isOpen={updateTripModaIsOpen} onClose={handleUpdateTripModal} />
        </div>
    )
}