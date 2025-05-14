import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SideBarItems } from "./SideBarItems";
import { Document } from "../../icons/Document";
import { MusicIcon } from "../../icons/MusicIcon";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { Dashboard } from "../../icons/Dashboard";


export function SideBar({onSelect, selectedType }:{onSelect: (type: string)=>void, selectedType: string}) {
    return <div className="h-screen bg-white border-r w-72 fixed top-0 left-0 pl-6 ">
        <div className="flex text-2xl pt-8 items-center">
            <div className="pr-2 text-[#5147e4]">
                <Logo />
            </div>
            BRAINLY
        </div>
        <div className="pt-8 pl-4">
            <SideBarItems icon={<Dashboard />} text="All" onClick={()=>onSelect("all")} isSelected={selectedType=== "all"}/>
            <SideBarItems icon={<TwitterIcon />} text="Twitter" onClick={()=>onSelect("twitter")} isSelected={selectedType=== "twitter"}/>
            <SideBarItems icon={<YoutubeIcon />} text="Youtube" onClick={()=>onSelect("youtube")} isSelected={selectedType=== "youtube"}/>
            <SideBarItems icon={<Document />} text="Article" onClick={()=>onSelect("article")} isSelected={selectedType=== "article"}/>
            <SideBarItems icon={<MusicIcon />} text="Music" onClick={()=>onSelect("music")} isSelected={selectedType=== "music"}/>
            <SideBarItems icon={<InstagramIcon />} text="Instagram" onClick={()=>onSelect("instagram")} isSelected={selectedType=== "instagram"}/>
        </div>
    </div>
}