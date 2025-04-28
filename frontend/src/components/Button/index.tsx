import { ComponentProps, ReactNode } from "react";
import { tv, VariantProps } from "tailwind-variants";
import { cn } from "../../utils/cn";

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants> {
    children: ReactNode;
}

const buttonVariants = tv({
    base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',
    variants: {
        variant: {
            primary: 'bg-lime-400 text-zinc-900 hover:bg-lime-300',
            secondary_text: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
            action: 'bg-zinc-800 text-zinc-600 hover:text-lime-400 hover:border-lime-400',
            caution: 'bg-zinc-800 text-zinc-200 hover:bg-red-600',
            disabled: 'bg-zinc-800 text-zinc-500',
        },
        size: {
            default: 'py-2',
            full: 'w-full h-11',
            mobile: 'w-full h-5'
        }
    },

    defaultVariants: {
        variant: 'primary',
        size: 'default'
    }
})


export const Button = ({ children, variant, size, className, ...props }: ButtonProps) => {
    return (
        <button {...props} className={cn(buttonVariants({ variant, size }), className)}>
            {children}
        </button>
    )
}