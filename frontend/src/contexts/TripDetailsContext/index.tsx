import { createContext, ReactNode, useState } from "react";
import { IActivities } from "../../@types/activity";
import { IGuest } from "../../@types/guest";
import { ILink } from "../../@types/link";
import { api } from "../../lib/axios";
import { ITrip } from "../../@types/trip";



export interface ITripDetailsContext {
    trip: ITrip | undefined,
    getTrip: (tripId: string) => void,
    tripIsLoading: boolean,
    guest: IGuest | undefined,
    getGuest: (tripId: string, guestId: string) => void,
    guestIsLoading: boolean,
    guests: IGuest[],
    listGuests: (tripId: string) => void,
    guestsIsLoading: boolean,
    links: ILink[],
    listLinks: (tripId: string) => void,
    linksIsLoading: boolean,
    activities: IActivities[],
    listActivities: (tripId: string) => void,
    activitiesIsLoading: boolean
}

export const TripDetailsContext = createContext({} as ITripDetailsContext)

export const TripDetailsProvider = ({ children }: { children: ReactNode }) => {
    const [guests, setGuests] = useState<IGuest[]>([])
    const [guestsIsLoading, setGuestsIsLoading] = useState(false)
    const [guest, setGuest] = useState<IGuest>()
    const [guestIsLoading, setGuestIsLoading] = useState(false)
    const [trip, setTrip] = useState<ITrip>()
    const [tripIsLoading, setTripIsLoading] = useState(false)
    const [links, setLinks] = useState<ILink[]>([])
    const [linksIsLoading, setLinksIsLoading] = useState(false)
    const [activities, setActivities] = useState<IActivities[]>([])
    const [activitiesIsLoading, setActivitiesIsLoading] = useState(false)





    const listGuests = async (tripId: string) => {
        setGuestsIsLoading(true)
        const { data } = await api.get(
            `/trips/${tripId}/participants`
        )
        setGuests(data.participants);
        setGuestsIsLoading(false);
    }

    const getGuest = async (tripId: string, guestId: string) => {
        setGuestIsLoading(true)
        const { data } = await api.get(
            `/trips/${tripId}/participants/${guestId}`
        )
        setGuest(data)
        setGuestIsLoading(false)
    }
    const listLinks = async (tripId: string) => {
        setLinksIsLoading(true)
        const { data } = await api.get(
            `/trips/${tripId}/links`
        )
        setLinks(data.links);
        setLinksIsLoading(false);
    }

    const listActivities = async (tripId: string) => {
        setActivitiesIsLoading(true)
        const { data } = await api.get(
            `/trips/${tripId}/activities`
        )
        setActivities(data.activities);
        setActivitiesIsLoading(false);
    }

    const getTrip = async (tripId: string) => {
        setTripIsLoading(true)
        const { data } = await api.get(
            `/trips/${tripId}`
        )
        setTrip(data.trip)
        setLinks(data.trip.links)
        setActivities(data.trip.activities)
        setGuests(data.trip.participants)
        setTripIsLoading(false)
    }

    return (
        <TripDetailsContext.Provider
            value={{
                trip,
                getTrip,
                tripIsLoading,
                guest,
                getGuest,
                guestIsLoading,
                guests,
                listGuests,
                guestsIsLoading,
                links,
                linksIsLoading,
                listLinks,
                activities,
                listActivities,
                activitiesIsLoading
            }}
        >
            {children}
        </TripDetailsContext.Provider>
    )
}