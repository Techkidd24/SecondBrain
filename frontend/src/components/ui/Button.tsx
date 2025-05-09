import { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    text: string;
    startIcon?: ReactElement;
    onClick?: () => void;
    fullWidth?: boolean;
}

const variantClasses = {
    "primary": "bg-[#5147e4] text-[#e0e7ff]",
    "secondary": "bg-[#e0e7ff] text-[#5147e4]"
}

const defaultStyles = "px-4 py-2 rounded-md flex items-center"

export function Button({ variant, text, startIcon, onClick, fullWidth }: ButtonProps) {
    return <button onClick={onClick} className={variantClasses[variant] + " " + defaultStyles + `${fullWidth ? " w-full flex justify-center" : ""}`}>
        <div className="pr-2">
            {startIcon}
        </div>
        {text}
    </button>
}