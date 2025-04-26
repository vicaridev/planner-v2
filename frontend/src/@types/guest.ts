export interface IGuest {
    id?: string,
    name: string | null,
    email: string,
    isConfirmed: boolean,
    isOwner: string,
    tripId?: string
}