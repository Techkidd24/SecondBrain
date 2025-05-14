import { useState } from "react";
import { CrossIcon } from "../../icons/CrossIcon";
import { Button } from "./Button";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { Duplicate } from "../../icons/Duplicate";

export function ShareBrain({ open, onClose }) {
    const [share, setShare] = useState(false);
    const [url, setUrl] = useState("");
    const [copied, setCopied] = useState(false);

    function handleCopy() {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500)
    }

    async function link() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        if (!response.data?.hash) {
            throw new Error("Invalid response: hash missing");
        }
        setUrl(`http://localhost:5173/share/${response.data?.hash}`);
        setShare(true)

    }

    async function deleteLink() {
        await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: false
        }, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
        setUrl("");
        setShare(false);
    }
    return <div>
        {open && <div>
            <div className="w-screen h-screen top-0 left-0 fixed bg-slate-500 opacity-60 flex justify-center">
            </div>
            <div className="w-screen h-screen top-0 left-0 fixed flex flex-col justify-center">
                <div className="flex justify-center">
                    <div className="w-max p-4 bg-white rounded-md border-gray-200 border">
                        <div className="flex justify-between">
                            Share Brain
                            <div className="cursor-pointer" onClick={onClose}>
                                <CrossIcon />
                            </div>
                        </div>
                        <div className=" flex gap-4 justify-around mt-2">
                            <Button variant={share === true ? "primary" : "secondary"} text="Public" onClick={link} />
                            <Button variant={share === false ? "primary" : "secondary"} text="Private" onClick={deleteLink} />
                        </div>
                        {share && <div className="mt-4 flex justify-around">
                            <div className="mt-2 mx-2">
                                {url}
                            </div>
                            <div onClick={handleCopy} className="py-2 px-4 mx-2 border rounded-md flex cursor-pointer hover:bg-slate-100">
                                <div className="my-1 mx-1">
                                    <Duplicate />
                                </div>
                                <button>Copy</button>
                            </div>
                        </div>}
                        {copied && <span className="text-green-600 text-xs ml-2">Copied!</span>}
                    </div>
                </div>
            </div>
        </div>}
    </div>
}