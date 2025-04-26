import Particles, { initParticlesEngine } from "@tsparticles/react"
import { particlesOptions } from "../../utils/particlesOptions"
import { useCallback, useEffect, useState } from "react"
import { loadFull } from "tsparticles"
import { Container } from "@tsparticles/engine"
import { LoginForm } from "./LoginForm"
import { RegisterForm } from "./RegisterForm"

export const OnBoarding = () => {
    const [loginFormOpen, setLoginFormOpen] = useState(true)
    const [registerFormOpen, setRegisterFormOpen] = useState(false)

    const handleForms = () => {
        setLoginFormOpen(!loginFormOpen)
        setRegisterFormOpen(!registerFormOpen)
    }

    const [init, setInit] = useState(false);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadFull(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        console.log(container);
    }, []);


    return (
        <div className="flex w-full">
            <div className="flex flex-1 flex-col justify-center items-center h-svh bg-pattern bg-center bg-no-repeat">
                {init && <Particles
                    id="tsparticles"
                    particlesLoaded={particlesLoaded}
                    options={particlesOptions}
                    className="absolute inset-0 z-0"
                />}
                <div className="flex items-center z-10 h-30 shadow-shape">
                    <img src="/logo.svg" alt="plann.er logo" className=" h-20 rounded-md bg-zinc-900/90" />

                </div>
            </div>
            <div className="flex flex-col z-10 items-center justify-center lg:basis-[35%] xl:basis-[25%] space-y-4 py-5 px-6 shadow-shape bg-zinc-900/90">
                <LoginForm handleRegisterForm={handleForms} isOpen={loginFormOpen} />
                <RegisterForm isOpen={registerFormOpen} handleLoginForm={handleForms} />
            </div>
        </div>

    )
}