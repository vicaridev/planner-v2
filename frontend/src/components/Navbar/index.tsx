
export const Navbar = () => {
    return (
        <nav className="flex items-center justify-between h-20 bg-zinc-800/90 w-dvh shadow-shape">
            <div className="flex items-center h-full">
                <img src="/logo.svg" alt="plann.er logo" />
                <ul className="flex h-full ml-4">
                    <li className="p-6 flex items-center cursor-pointer hover:bg-lime-500">Viagens</li>
                    <li className="p-6 flex items-center cursor-pointer hover:bg-lime-500">Perfil</li>
                </ul>
            </div>
            <button className="cursor-pointer flex items-center justify-center h-full w-20 text-rose-900 hover:bg-red-600 hover:text-zinc-100">
                Sair
            </button>
        </nav>
    )
}