import { TripDetailsProvider } from "./contexts/TripDetailsContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { AppRoutes } from "./routes";



export const App = () => {

    return (
        <SnackbarProvider>
            <AuthProvider>
                <TripDetailsProvider>
                    <AppRoutes />
                </TripDetailsProvider>
            </AuthProvider>
        </SnackbarProvider>
    )
}

