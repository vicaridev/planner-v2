export interface IActivities {
    date: string,
    activities: IActivity[]
}

export interface IActivity {
    id?: string,
    title: string,
    occurs_at: string
}