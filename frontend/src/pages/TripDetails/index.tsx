import { useState } from "react";
import { ImportantLinks } from "./ImportantLinks";
import { Guests } from "./Guests";
import { TripInformation } from "./TripInformation";
import { ActivitiesList } from "./ActivitiesList";
import { CreateActivityModal } from "./ActivitiesList/CreateActivityModal";

export const TripDetails = () => {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false);
    const handleCreateActivityModal = () => {
        setIsCreateActivityModalOpen(!isCreateActivityModalOpen)
    }


    return (
        <div className="max-w-6xl px-6 py-10 h-full mx-auto space-y-8 justify-center">
            <TripInformation />
            <main className="flex flex-col-reverse lg:flex-row gap-8 px-6">
                <div className="flex-1 space-y-6">
                    <ActivitiesList handleCreateActivityModal={handleCreateActivityModal} />
                </div>
                <div className="w-80 space-y-6 sm:flex-row">
                    <ImportantLinks />
                    <div className='w-full h-px bg-zinc-700' />
                    <Guests />
                </div>
            </main>
            <CreateActivityModal isOpen={isCreateActivityModalOpen} onClose={handleCreateActivityModal} />
        </div>
    )
}