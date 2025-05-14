import { ReactElement } from "react";

interface sideBarProps {
    text: string;
    icon: ReactElement;
    onClick?: ()=>void;
    isSelected?: boolean;   
}

export function SideBarItems({ text, icon, onClick, isSelected }: sideBarProps) {
    return ( 
    <div 
        onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 cursor-pointer rounded ${
        isSelected ? "bg-indigo-100 text-indigo-700 font-semibold" : "text-gray-600"
      }`}>
        <div className="pr-2">
            {icon}
        </div>
        <div>
            {text}
        </div>
    </div>
    )
}