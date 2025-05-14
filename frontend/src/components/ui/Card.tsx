import { Document } from "../../icons/Document";
import { Dustbin } from "../../icons/Dustbin";
import { Edit } from "../../icons/Edit";
import { ShareIcon } from "../../icons/ShareIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

interface cardProps {
    id: string;
    title: string;
    link: string;
    type: "youtube" | "twitter";
    tag: string[];
    onDelete?: (id: string) => void;
    onEdit?: ()=> void;
}

export function Card({ title, link, type, onDelete, id, onEdit, tag}: cardProps) {
    const getIcon = () => {
        if (type === "youtube") return <YoutubeIcon />;
        if (type === "twitter") return <TwitterIcon />;
        
        // return <Document />
    }

    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 border">
            <div className="flex justify-between">
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        {getIcon()}
                    </div>
                    {title}
                </div>
                <div className="flex items-center text-gray-500">
                    <div className="pr-2">
                        <ShareIcon />
                    </div>
                    <button className="hover:bg-gray-200 rounded mr-2" onClick={onEdit}>
                        <Edit/>
                    </button>
                    <button className="hover:bg-gray-200 rounded" onClick={() => onDelete(id)}>
                        <Dustbin />
                    </button>
                </div>
            </div>
            <div className="pt-4 w-72 h-44">
                {type === "youtube" && <iframe className="w-full" src={link.replace("watch", "embed").replace("?v=", "/")} title=" " frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
                {tag.map((t, idx)=>(
                    <div
                    key={idx}
                    className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                        {t}
                    </div>
                ))}
            </div>
        </div>
    </div>
}