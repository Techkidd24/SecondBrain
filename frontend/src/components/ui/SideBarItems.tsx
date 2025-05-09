import { ReactElement } from "react";

interface sideBarProps {
    text: string;
    icon: ReactElement;
}

export function SideBarItems({ text, icon }: sideBarProps) {
    return <div className="flex text-gray-700 py-2 cursor-pointer hover:bg-gray-200 rounded max-w-48 pl-4 transition-all">
        <div className="pr-2">
            {icon}
        </div>
        <div>
            {text}
        </div>

    </div>
}