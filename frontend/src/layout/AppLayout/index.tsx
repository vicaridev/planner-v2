import { Outlet } from "react-router-dom"
import { Navbar } from "../../components/Navbar"

export const AppLayout = () => {
    return (
        <div className="flex flex-col w-full">
            <Navbar />
            <div className="flex-1 h-full">
                <Outlet />
            </div>
        </div>
    )
}