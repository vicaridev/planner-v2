import { ISourceOptions } from "@tsparticles/engine";

export const particlesOptions: ISourceOptions = {
    key: "poisson",
    name: "Poisson",
    autoPlay: true,
    particles: {
        number: {
            value: 100,
        },
        color: {
            value: "#ffffff",
        },
        links: {
            enable: true,
            distance: 200,
        },
        shape: {
            type: "circle",
        },
        opacity: {
            value: -5,
        },
        size: {
            value: {
                min: 4,
                max: 6,
            },
        },
        move: {
            enable: true,
            speed: 0.8,
        },
    },
    background: {
        color: "#000000",
    },
    poisson: {
        enable: true,
    },
};