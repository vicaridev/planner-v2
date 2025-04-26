import { ReactNode } from "react";
import { useAuth } from "../../hooks/useContext/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const PrivateRoute = ({ item }: { item: ReactNode }) => {
    const { isAuthenticated, signOut } = useAuth();
    const location = useLocation()

    if (!isAuthenticated()) {
        signOut()
        return <Navigate to="/login" state={{ from: location }} />
    }

    return item
}