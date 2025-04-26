import { BrowserRouter, Route, Routes } from "react-router-dom"
import { AppLayout } from "../layout/AppLayout"
import { TripDetails } from "../pages/TripDetails"
import { OnBoarding } from "../pages/OnBoarding"
import { ConfirmTripInvite } from "../pages/ConfirmTripInvite"
import { PrivateRoute } from "./PrivateRoute"
import { Home } from "../pages/Home"

export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/on_boarding' element={<OnBoarding />} />
                <Route path='/' element={<PrivateRoute item={<AppLayout />} />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/trips/:trip_id' element={<TripDetails />} />
                    <Route
                        path='/trips/:trip_id/participant/:participant_id/invite'
                        element={<ConfirmTripInvite />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}