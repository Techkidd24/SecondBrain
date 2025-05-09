import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";

export function SideBar() {
    return <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6 ">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-[#5147e4]">
                <Logo />
            </div>
            BRAINLY
        </div>
        <div className="pt-8 pl-4">
            <SideBarItems icon={<TwitterIcon />} text="Twitter" />
            <SideBarItems icon={<YoutubeIcon />} text="Youtube" />
        </div>
    </div>
}